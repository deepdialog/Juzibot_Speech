
import { FileBox } from 'file-box'
import { urlToFile } from '../components/url-to-file/index.js'
import { saveFile } from '../components/file-manage/index.js'
import { arxivUrlToFile } from '../components/url-to-file/index.js'
import { getObject } from '../components/minio/index.js'
import { listData } from '../components/search/index.js'
import { kwExtraction } from '../components/kw-extraction/index.js'
import rp from 'request-promise'
import { pdfToText } from '../components/pdf-to-text/index.js'
/**
 * URL保存相关
 * @param {*} msg 消息
 * @param {*} intent 意图
 */
export async function actionSaveUrl(msg, intent) {
    try {
        if (intent.url.match(/https:\/\/arxiv.org\/(abs\/\d+\.\d+)|(pdf\/\d+\.\d+\.pdf)/)) {
            msg.say("解析arxiv地址...")
            const ret = await arxivUrlToFile(intent.url)
            const title = ret.title, content = ret.content, abst = ret.abst
            const kws = await kwExtraction(title + '\n' + abst, 'en') 
            for await(const x of saveFile(intent.contactId, intent.room, ret.fileBox, msg.talker().payload, {
                url: intent.url,
                title: title,
                content: content + '\n' + abst,
                tags: kws
            })) {
                await msg.say(x + `\n论文标题：${title}\n论文类别：${content}\n关键词: ${kws.join(", ")}`)
            }
            const fileInfo = await listData(`wechaty/${intent.contactId}`, 0, 1, true)
            const fileList = fileInfo.data
            await msg.say(FileBox.fromBuffer(
                await getObject(fileList[0].fileid),
                fileList[0].name
            ))
            return
        } else {
            var ret
            if (intent.url.endsWith('.pdf')) {
                const headers = {
                    // 'Host': 'arxiv.org',
                    'Refer': intent.url,
                    'User-Agent':
                        'NoSuchBrowser/1.0'
                }

                const options = {
                    url: intent.url, encoding: null, headers: headers
                }

                ret = {
                    buf: await rp(options),
                    title: intent.url.substring(intent.url.lastIndexOf('/') + 1, intent.url.length - 4),
                    content: null,
                    tags: []
                }
                if (ret.buf) {
                    const pdfContent = await pdfToText(ret.buf)
                    ret.content = pdfContent.content
                }
                if (ret.content) {
                    ret.tags = await kwExtraction(ret.content)
                }
            } else {
                ret = await urlToFile(intent.url)
            }

            if (ret && ret.buf) {
                const fileBox = FileBox.fromBuffer(ret.buf, `${intent.title || ret.title}.pdf`)
                for await(const x of saveFile(intent.contactId, intent.room, fileBox, msg.talker().payload, {
                    url: intent.url,
                    title: intent.title || ret.title,
                    content: ret.content,
                    tags: ret.tags || null
                })) {
                    await msg.say(x)
                }
                return
            } else {
                await msg.say(`我尝试了帮你这个URL： ${intent.url} ，但是我失败了`)
            }
        }
    } catch (e) {
        console.error(e)
        console.log(e.toString())
        await msg.say(`我尝试了帮你这个URL： ${intent.url} ，但是我出错了`)
    }
}
