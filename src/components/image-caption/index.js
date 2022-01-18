// import fs from 'fs'
import process from 'process'
import fetch from 'node-fetch'

const URL = process.env.IMAGE_CAPTION || 'http://localhost:10970/api/image_caption'

/**
 * 将文件转换为一句话描述，算法还有待优化
 * @param {*} b64 图片base64编码
 * @returns 图片的描述
 */
export async function imageCaption(b64) {
    // const b64 = await filebox.toBase64()
    // const img = fs.readFileSync('pingguo.png')
    // const b64 = Buffer.from(img).toString('base64')
    // console.log(b64.substring(0, 10))
    const res = await fetch(URL, {
        method: 'POST',
        headers: {'ContentType': 'application/json'},
        body: JSON.stringify({ image: b64 }),
    })
    const json = await res.json()
    console.log('image-caption', json)
    return {
        text: json.text || '',
        b64,
    }
}
