import mammoth from 'mammoth'


/**
 * 转换docx类型文件到纯文本
 * @param {*} buf 文件的buf
 * @returns 纯文本
 */
export const docToText = async (buf) => {
    try {
        const text = (await mammoth.extractRawText({ buffer: buf })).value;
        const lines = text.split('\n');
        if (lines.length > 0) {
            return {
                title: '',
                content: lines.join("\n")
            }
        }
    } catch (e) {
        console.error(e)
    }
    return {
        title: '',
        content: '',
    }
}

// import fs from 'fs'
// const buf = fs.readFileSync('计划文档.docx')
// // console.log(buf)
// const text = await docToText(buf)
// console.log(text)
