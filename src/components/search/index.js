
import { Client } from '@opensearch-project/opensearch'
import process from 'process'

const INDEX = process.env.ES_INDEX || 'juzibot'
const client = new Client({
    node: process.env.ES_ADDR || 'https://admin:admin@localhost:9200/',
    ssl: {
        rejectUnauthorized: false,
    },
})

/**
 * 添加数据对象
 * @param {*} obj 对象
 */
export async function addData(obj) {
    await client.index({
        id: obj.fileid,
        index: INDEX,
        body: obj,
    })
    await client.indices.refresh({ index: INDEX })
}

/**
 * 更新数据对象(笔记)
 */
export async function updateData(obj) {
    // console.log(obj);
    await client.index({
        id: obj.fileid,
        index: INDEX,
        body: obj,
    })
}

/**
 * 删除数据对象
 * @param {*} fileid 文件id
 */
export async function removeData(fileid) {
    await client.deleteByQuery({
        index: INDEX,
        body: {
            query: {
                term: {
                    'fileid.keyword': fileid,
                }
            }
        }
    })
    await client.indices.refresh({ index: INDEX })
}

/**
 * 列出数据对象
 * @param {*} path 路径
 * @param {*} from 翻页的offset
 * @param {*} size 翻页的每页多少条
 * @param {*} detail 是否返回详细数据
 * @returns 列出文件的数据信息
 */
export async function listData(path, from = 0, size = 10, detail = false) {
    const body = {
        query: {
            term: {
                'path.keyword': path,
            }
        },
        sort: [
            {
                "createdAt.keyword": "desc",
            }
        ],
        from,
        size,
        "track_total_hits": true,
    }
    if (!path) {
        body['query'] = {
            match_all: {}
        }
    }
    console.log('search: body %s', JSON.stringify(body, null, 2))
    try {
        const result = await client.search({
            index: INDEX,
            body
        })
        if (detail) {
            return {
                data: result['body']['hits']['hits'].map(t => t._source),
                total: result['body']['hits']['total']['value'],
            }
        }
        return result['body']['hits']['hits'].map(t => t._source)
    } catch (err) {
        console.error(err)
        return []
    }
}

/**
 * 搜索文件（文本）
 * @param {*} path 路径
 * @param {*} text 关键词
 * @param {*} from 翻页的offset
 * @param {*} size limit
 * @returns 结果数组
 */
export async function searchData(path, text, from = 0, size = 10) {
    const body = {
        min_score: 0.5,
        query: {
            bool: {
                should: [
                    { match_phrase: { name: text } },
                    // { match_phrase: { filename: text } },
                    { match_phrase: { tags: text } },
                    { match_phrase: { title: text } },
                    { match_phrase: { content: text } },
                ],
                filter: [
                    { term: { 'path.keyword': path } }
                ]
            }
        },
        from,
        size,
    }
    console.log('search: body %s', JSON.stringify(body, null, 2))
    const result = await client.search({
        index: INDEX,
        body
    })
    console.log(JSON.stringify(result['body']['hits']['hits'], null, 2))
    return result['body']['hits']['hits'].map(t => t._source)
}

/**
 * 搜索最近的notes
 * @param {*} path 路径
 * @returns 结果对象或null（没有笔记）
*/
export async function searchLastNote(path) {
    const body = {
        min_score: 0.5,
        query: {
            bool: {
                should: [
                    { match: { path: path }, },
                    { match: { fileType: 'note' } }
                ]
            }
        },
        sort: [
            {
                "createdAt.keyword": "desc",
            }
        ],
        from: 0,
        size: 1
    }
    const result = await client.search({
        index: INDEX,
        body
    })
    const total = result['body']['hits']['total']['value']
    const res = result['body']['hits']['hits'].map(t => t._source)
    return total == 0 ? null : res[0]
}
// console.log(JSON.stringify(await searchData('知识图谱'), null, 2))

// await removeData("wechaty/7881302454907559/知识图谱在证券监管领域的应用.docx")
// console.log(JSON.stringify(await listData("wechaty/7881302454907559"), null, 2))
// console.log(JSON.stringify(await listData(), null, 2))

