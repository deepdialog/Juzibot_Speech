import fetch from 'node-fetch'
import process from 'process'
const kwZhUrl = process.env.KW_ZH || 'http://localhost:12930/api/kw-extr-zh'
const kwEnUrl = process.env.KW_EN || 'http://localhost:12930/api/kw-extr-en'


/**
 * 关键词提取
 * @param {*} text 文本
 * @param {*} lang 语言：'zh'/'en'/'auto'自动识别，
 */
export async function kwExtraction(text, lang = 'auto') {
    // const b64 = await filebox.toBase64()
    if (lang !== 'en' && lang !== 'zh') {
        lang = 'en'
        if (text.match(/[\u4e00-\u9fa5]/i)) {
            lang = 'zh'
        }
    }
    const response = await fetch(lang === 'zh' ? kwZhUrl : kwEnUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text.substr(0, 1000) , topk: 4})
    })

    const res = await response.json()
    return res.data
}
