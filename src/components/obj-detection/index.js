import fetch from 'node-fetch'
import process from 'process'
const url = process.env.OBJ_DETECTION || 'http://localhost:12920/api/object-detect'

/**
 * 识别图片中的对象
 * @param {*} b64 图片
 * @returns 对象数组
 */
export async function objDetection(b64) {
    // const b64 = await filebox.toBase64()

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: b64 })
    })

    const res = await response.json()
    return res.ok ? res.data : null
}
