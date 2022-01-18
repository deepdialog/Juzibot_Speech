/**
 * web后台
 */

import { parentPort } from 'worker_threads'
import process from 'process'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mime from 'mime'

import { listData, removeData, searchData } from '../components/search/index.js'
import { getObject, removeObject } from '../components/minio/index.js'
import { listIntent, addIntentVector, removeIntent } from '../intent-query-detect.js'
import { textVector } from '../components/text-to-vector/index.js'

const PORT = process.env.WEB_PORT || 8000
const HOST = '0.0.0.0'
const app = express()
app.use(cors({ origin: false }))
app.use(bodyParser.json())


/**
 * 不要删除，这里可以给Docker的HealthCheck提供服务
 */
app.get('/', async (req, res) => {
    res.send('hello world')
    res.end()
})


/**
 * 添加意图
 */
async function postApiIntent(req, res) {
    if (!req.body.belong) {
        res.json({
            ok: false,
            error: 'Invalid belong',
        })
        return res.end()
    }
    if (!req.body.id) {
        res.json({
            ok: false,
            error: 'Invalid id',
        })
        return res.end()
    }
    if (!req.body.text) {
        res.json({
            ok: false,
            error: 'Invalid text',
        })
        return res.end()
    }
    if (!req.body.intent) {
        res.json({
            ok: false,
            error: 'Invalid intent',
        })
        return res.end()
    }
    const { intent, text, id, belong } = req.body
    const vector = await textVector(text)
    await addIntentVector(id, intent, text, vector, belong)
    res.json({
        ok: true,
    })
    return res.end()
}
app.post('/api/intent', postApiIntent)


/**
 * 查询意图
 */
async function getApiIntent(req, res) {
    if (!req.params.belong) {
        res.json({
            ok: false,
            error: 'Invalid belong',
        })
        return res.end()
    }
    const { belong } = req.params
    const rets = await listIntent(belong)
    res.json({
        ok: true,
        data: rets,
    })
    res.end()
}
app.get('/api/intent/:belong', getApiIntent)


/**
 * 删除意图
 */
async function deleteApiIntent(req, res) {
    if (!req.params.id) {
        res.json({
            ok: false,
            error: 'Invalid id',
        })
        return res.end()
    }
    await removeIntent(req.params.id)
    res.json({ ok: true })
    return res.end()
}
app.delete('/api/intent/:id', deleteApiIntent)


/**
 * 列出文件数据
 * curl http://localhost:8000/api/list_data/R:10696051330023755
 */
async function getApiListData (req, res) {
    if (!req.params.path) {
        res.json({
            ok: false,
            error: 'Invalid path',
        })
        return res.end()
    }
    const { path, from, size } = req.params
    const data = await listData('wechaty/' + path, from, size, true)
    res.json({
        ok: true,
        data,
    })
    res.end()
}
app.get('/api/list_data/:path/:from/:size', getApiListData)


/**
 * 按照关键词搜索文件并列出
 * curl http://localhost:8000/api/list_data/R:10696051330023755
 */
 async function getApiSearchFile (req, res) {
    if (!req.params.path) {
        res.json({
            ok: false,
            error: 'Invalid path',
        })
        return res.end()
    }
    const { path, keyword, from, size } = req.params
    const data = await searchData('wechaty/' + path, keyword, from, size)
    res.json({
        ok: true,
        data,
    })
    res.end()
}
app.get('/api/search_file/:path/:keyword/:from/:size', getApiSearchFile)


/**
 * 向某个contact发送某个文件名为name的fileid文件
 */
async function getApiSendFile (req, res) {
    if (!req.params.fileid) {
        res.json({
            ok: false,
            error: 'Invalid fileid',
        })
        return res.end()
    }
    if (!req.params.contact) {
        res.json({
            ok: false,
            error: 'Invalid contact',
        })
        return res.end()
    }
    if (!req.params.name) {
        res.json({
            ok: false,
            error: 'Invalid name',
        })
        return res.end()
    }
    parentPort.postMessage({
        event: 'sendfile',
        fileid: req.params.fileid,
        contact: decodeURIComponent(req.params.contact),
        name: req.params.name,
    })
    res.json({
        ok: true
    })
    res.end()
}
app.get('/api/send/:contact/:fileid/:name', getApiSendFile)


/**
 * 获取文件
 * localhost:8000/api/file/c855f042-1e1a-47ae-a84a-949e82b9c2ec/a.jpg
 */
async function getApiFile (req, res) {
    if (!req.params.fileid) {
        res.status(404).send('Invalid path')
        return res.end()
    }
    if (!req.params.name) {
        res.status(404).send('Invalid path')
        return res.end()
    }
    const { fileid, name } = req.params
    const file = await getObject(fileid)
    if (!file) {
        res.status(404).send('Not found')
        return res.end()
    }
    // 如果加了这个，会变成强制下载
    // res.setHeader('Content-disposition', 'attachment; filename=' + encodeURIComponent(name))
    const contentType = mime.getType(name)
    if (contentType) {
        res.contentType(contentType)
    } else {
        res.contentType('application/octet-stream')
    }
    res.send(file)
    res.end()
}
app.get('/api/file/:fileid/:name', getApiFile)

/**
 * 删除文件
 * localhost:8000/api/file/c855f042-1e1a-47ae-a84a-949e82b9c2ec/a.jpg
 */
async function deleteFile (req, res) {
    if (!req.params.fileid) {
        res.json({
            ok: false,
            error: 'Invalid fileid'
        })
        return res.end()
    }
    const { fileid } = req.params
    await removeObject(fileid)
    await removeData(fileid)
    res.json({
        ok: true,
    })
    return res.end()
}
app.delete('/api/file/:fileid', deleteFile)


app.listen(PORT, HOST, () => {
    console.log('backend green on %s:%s', HOST, PORT)
})
