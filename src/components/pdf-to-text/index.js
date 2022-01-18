// import _ from 'lodash'
import pdfUtil from 'pdf-to-text'
import tempfile from 'tempfile'
import fs from 'fs'

/**
 * 解析PDF文件，返回纯文本
 * @param {*} buf 文件
 * @returns 文字
 */
export async function pdfToText(buf) {
    return new Promise((resolve, reject) => {
        try {
            const filepath = tempfile('.pdf')
            fs.writeFileSync(filepath, buf)
            pdfUtil.pdfToText(filepath, (err, data) => {
                fs.unlink(filepath, err => {
                    if (err) {
                        console.error(err)
                    }
                })
                if (err) return reject(err);
                resolve({
                    title: '',
                    content: data
                }) 
            });
        } catch (e) {
            resolve({
                title: '',
                content: ''
            })
        }
    })
}

// const buf = fs.readFileSync('计划文档.pdf')
// console.log(buf)
// console.log(await pdfToText(buf))
