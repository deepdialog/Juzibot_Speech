import fetch from 'node-fetch'
import process from 'process'
const url = process.env.OCR || 'http://localhost:12910/api/ocr'

/**
 * 对图片识别ocr文字
 * @param {*} b64 图片base64
 * @returns ocr结果文本
 */
export async function ocr(b64) {
    // const b64 = await filebox.toBase64()

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: b64 })
    })

    const res = await response.json()
    return res.data
}

// chat(['你好', '你是谁'])
