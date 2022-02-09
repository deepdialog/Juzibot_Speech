// import fs from 'fs'
import process from 'process'
import fetch from 'node-fetch'

 const URL = process.env.TEXT_VECTOR || 'http://localhost:10950/api/encode'
// const URL = process.env.TEXT_VECTOR || 'http://localhost:61111/api/sts/'
/**
 * 文字转换为向量，类似谷歌的Universal Sentence Encoder
 * 需要外部服务
 * process.env.TEXT_VECTOR || 'http://localhost:10950/api/encode'
 * @param {*} text 待转换的文本
 * @returns 向量
 */
export async function textVector(text) {
    const res = await fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ "text":text }),
    })
    const json = await res.json()
    // console.log('text-vector', json)
    // const rg = {
    //     ok: true,
    //     data: json
    // }
    // console.log('text-vector', rg)
    return json
}

// console.log(await textVector('dd'))
