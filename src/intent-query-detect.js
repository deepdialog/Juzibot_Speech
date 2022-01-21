import fs from 'fs'
import md5 from 'md5'
import YAML from 'yaml'
// 这里用opensearch的，因为用elasticsearch的会不兼容KNN搜索
import { Client } from "@opensearch-project/opensearch"
import process from 'process'
import { textVector } from './components/text-to-vector/index.js'


const INDEX = process.env.ES_INDEX || 'juzibot-intent'
const client = new Client({
    node: process.env.ES_ADDR || 'https://admin:admin@localhost:9200/',
    ssl: {
        rejectUnauthorized: false,
    },
})

/**
 * 删除一个id
 * @param _id 删除对应id
 */
export async function removeIntent(_id) {
    await client.deleteByQuery({
        index: INDEX,
        body: {
            query: {
                term: {
                    'id.keyword': _id,
                }
            }
        }
    })
    await client.indices.refresh({ index: INDEX })
}

/**
 * 列出intent
 * @param belong 属于谁
 */
export async function listIntent(belong='general') {
    const body = {
        query: {
            term: {
                'belong.keyword': belong,
            },
        },
    }
    const result = await client.search({
        body,
        index: INDEX,
    })
    return result['body']['hits']['hits'].map(t => t._source)
}

/**
 * 添加一个文本向量意图
 * @param {*} _id 某个标识
 * @param {*} intent 意图
 * @param {*} text 对应回答
 * @param {*} vector 向量
 * @param {*} belong 属于哪个人或者群
 * @returns 处理结果
 */
export async function addIntentVector(_id, intent, text, vector, belong='general') {
    const ret = await client.index({
        id: _id,
        index: INDEX,
        body: {
            id: _id,
            intent,
            text,
            vector,
            belong,
        },
    })
    await client.indices.refresh({ index: INDEX })
    return ret
}

/**
 * 读取已经存在的一些写死的意图
 */
export async function loadExistsIntent() {
    const file = fs.readFileSync('./intent.yml', 'utf8')
    const data = YAML.parse(file)
    console.log(data)
    for (const item of data) {
        for (const intent in item) {
            for (const value of item[intent]) {
                const _id = md5(`${intent}--${value}`)
                const vec = await textVector(value)
                console.log(_id, intent, value, vec.length)
                await addIntentVector(_id, intent, value, vec)
            }
        }
    }
}

/**
 * 查询一个意图，先把文本转换为向量，然后调用opensearch进行knn查找
 * @param {*} text 文本
 * @param {*} belong 属于的群或者人
 * @param {*} threshold 相似度阈值
 * @param {*} k 返回多少条
 * @returns 相似度大于阈值的意图或者空
 */
export async function queryIntent(text, belong='general', threshold=0.8, k=3) {
    const vector = await textVector(text)
    const body = {
        _source: ['intent', 'text'],
        query: {
            bool: {
                must: [
                    {
                        knn: {
                            vector: {
                              vector,
                              k,
                            }
                        }
                    }
                ],
                filter: [
                    {
                        term: {
                            'belong.keyword': belong,
                        }
                    },
                ]
            }
        },
    }
    const rets = await client.search({
        index: INDEX,
        body,
    })
    
    
    //console.log('intent-vector-query', rets.body.hits.hits)
    
    let results = []
    try {
        results = rets.body.hits.hits.map(item => {
            let score = item._score
            // Clip to [-1.0, 1.0]
            score = Math.max(-1.0, Math.min(1.0, score))
            // acos
            score = 1 - Math.acos(score) / Math.PI
            return {
                ...item._source,
                score,
            }
        })
    } catch(e) {
        console.error(e)
    }
    
    //console.log('intent-vector-query', results)
    
    if (results.length && results[0].score && results[0].score > threshold) {
        return results[0].intent
    }
    return null
}

// await loadExistsIntent()
// console.log(await queryIntent('。。。', ''))
