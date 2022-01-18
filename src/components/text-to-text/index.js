
import chardet from 'chardet'

/**
 * 解析读取纯文本，还是有用的，因为文本对象编码可能有问题
 * @param {*} buf 文本buf
 * @returns 文本
 */
export async function textToText(buf) {
    const c = chardet.detect(buf)
    if (c) {
        var text
        try {
            text = buf.toString(c)
        } catch (e) {
            text = buf.toString()
        }
        return {
            title: '',
            content: text,
        }
    }
    return {
        title: '',
        content: '',
    }
}

// import fs from 'fs'
// console.log(await textToText(fs.readFileSync('我爱你.txt')))
