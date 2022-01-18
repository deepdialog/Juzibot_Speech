
import { FileBox } from 'file-box'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import { putObject, getObject, removeObject } from '../minio/index.js'
import { addData, removeData, searchData, listData, updateData } from '../search/index.js'
import { docToText } from '../doc-to-text/index.js'
import { pdfToText } from '../pdf-to-text/index.js'
import { textToText } from '../text-to-text/index.js'
import { imageCaption } from '../image-caption/index.js'
import { ocr } from '../ocr/index.js'
import { objDetection } from '../obj-detection/index.js'
import { kwExtraction } from '../kw-extraction/index.js'

/**
 * 保存文件
 * @param {*} contactId 联系人ID
 * @param {*} room 是否是群
 * @param {*} fileBox 文件对象
 * @param {*} user 用户信息
 * @param {*} urlFile 是否是URL链接来的文件
 */
export async function* saveFile(contactId, room, fileBox, user, urlFile = null) {
    console.info(`Get file ${fileBox.name}...`)
    let name = `wechaty/${contactId}/${fileBox.name}`

    let fileType = 'file'
    let res = ''
    var objDetect = []
    if (fileBox.name.match(/\.(png|jpg)$/)) {
        fileType = 'image'
        const b64 = await fileBox.toBase64()
        const ret = await imageCaption(b64)
        const ocr_ret = await ocr(b64)
        objDetect = await objDetection(b64)
        if (!(ocr_ret == null || ocr_ret === '')) {
            res = ocr_ret
        }
        if (ret.text && ret.text.length) {
            if (fileBox.name.match(/\.png$/)) {
                fileBox = FileBox.fromBase64(ret.b64, ret.text + '.png')
            } else {
                fileBox = FileBox.fromBase64(ret.b64, ret.text + '.jpg')
            }
            name = `wechaty/${contactId}/${fileBox.name}`
        } else {
            fileBox = FileBox.fromBase64(ret.b64, fileBox.name)
        }
    }

    const buf = await fileBox.toBuffer()
    let meta = {
        name,
        fileType,
        contactId: contactId.toString(),
        path: `wechaty/${contactId}`,
        title: '',
        content: res,
        tags: objDetect,
        date: '',
        user,
        room: !!room,
        url: '',
        filesize: buf.length,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        fileid: uuidv4(),
    }

    if (urlFile) {
        meta = {
            ...meta,
            ...urlFile,
        }
    } else {
        try {
            if (fileBox.name.match(/\.docx/i)) {
                meta = {
                    ...meta,
                    ...await docToText(buf)
                }
                if (meta.content) {
                    meta.tags = await kwExtraction(meta.content)
                }
            } else if (fileBox.name.match(/\.pdf/i)) {
                meta = {
                    ...meta,
                    ...await pdfToText(buf)
                }
                if (meta.content) {
                    meta.tags = await kwExtraction(meta.content)
                }
            } else if (fileBox.name.match(/\.txt/i)) {
                meta = {
                    ...meta,
                    ...await textToText(buf)
                }
                if (meta.content) {
                    meta.tags = await kwExtraction(meta.content)
                }
            } else if (fileBox.name.match(/\.(md|py|js|php|c|cpp|jl|rs|go)$/i)) {
                meta = {
                    ...meta,
                    ...await textToText(buf)
                }
                meta.tags = ["source code"]
                const tags = ["markdown", 'c', 'julia', 'python', 'javascript', 'php', 'c++', 'rust', 'go']
                const ends = ['.md', '.c', '.jl', '.py', '.js', '.php', '.cpp', '.rs', '.go']
                for (let index = 0; index < tags.length; index++) {
                    if (fileBox.name.endsWith(ends[index])) {
                        meta.tags.push(tags[index])
                        break
                    }
                }
            }
        } catch (e) {
            yield '抱歉，我解析文件的内容出错了'
        }
    }

    console.log('bot: add file %s', JSON.stringify(meta, null, 2))
    await putObject(meta.fileid, buf, buf.length, {
        'Content-Type': 'application/octet-stream',
    })
    await addData(meta)


    yield `我已经帮您保存了“${fileBox.name}”`
}


/**
 * 文件管理相关控制功能
 * @param {*} intent 意图
 */
export async function* fileManage(intent) {

    if (intent.intent.indexOf('search') >= 0) {
        const fileList = await searchData(`wechaty/${intent.contactId}`, intent.keywords)
        if (!fileList.length) {
            yield `没有找到关键词“${intent.keywords}”相关文件`
            return
        }

        if (intent.intent === 'search-file') {
            const fileListText = fileList.filter(f => f.name && f.fileType !== 'note')
                .map(f => {
                    return {
                        name: f.name.replace(/wechaty\/[^/]+\//, ''),
                        date: f.createdAt
                    }
                })
                .map((obj, ind) => {
                    return `${ind + 1}: ${obj.name} https://chat-assist.juzibot.com/file/${encodeURIComponent(intent.contactId)}/${encodeURIComponent(obj.fileid)}`
                })
                .join("\n")
            const url = `https://chat-assist.juzibot.com/search_file/` +
                `${encodeURIComponent(intent.contactId)}/${encodeURIComponent(intent.keywords)}`
            yield `根据关键字“${intent.keywords}”一共找到${fileList.length}个文件，分别是：\n${fileListText}\n详情见${url}`
            return
        }

        if (intent.intent === 'get-search-file') {
            const number = intent.number
            if (number - 1 >= fileList.length || number - 1 < 0) {
                yield `现在群里没有编号为${number}的文件`
                return
            }
            yield FileBox.fromBuffer(
                await getObject(fileList[number - 1].fileid),
                fileList[number - 1].name
            )
            return
        }

        if (intent.intent === 'remove-search-file') {
            const number = intent.number
            if (number - 1 >= fileList.length || number - 1 < 0) {
                yield `现在群里没有编号为${number}的文件`
                return
            }
            const name = fileList[number - 1].name
            const cleanName = name.replace(/wechaty\/[^/]+\//, '')
            await removeObject(fileList[number - 1].fileid)
            await removeData(fileList[number - 1].fileid)
            yield `文件“${cleanName}”删除成功`
            return
        }
    }

    const fileInfo = await listData(`wechaty/${intent.contactId}`, 0, 10, true)
    const fileList = fileInfo.data
    const total = fileInfo.total
    const url = `https://chat-assist.juzibot.com/file/${encodeURIComponent(intent.contactId)}`
    console.log('fileList', fileList)
    if (!fileList.length) {
        yield '您还没保存过文件'
        return
    }

    if (intent.intent === 'list-file') {
        const fileListText = fileList.filter(f => f.name)
            .map(f => {
                return {
                    name: f.name.replace(/wechaty\/[^/]+\//, ''),
                    date: f.createdAt
                }
            })
            .map((obj, ind) => {
                return `${ind + 1}: ${obj.name} ${obj.date}`
            })
            .join("\n")
        if (total <= 10) {
            yield `您一共有${total}个文件，分别是：\n${fileListText}\n更多文件管理请查看\n${url}`
        } else {
            yield `您一共有${total}个文件，最新的10个分别是：\n${fileListText}\n更多文件管理请查看\n${url}`
        }
        return
    }

    if (intent.intent === 'get-file') {
        const number = intent.number
        console.log(number);
        if (number - 1 >= fileList.length || number - 1 < 0) {
            yield `现在群里没有编号为${number}的文件`
            return
        }
        yield FileBox.fromBuffer(
            await getObject(fileList[number - 1].fileid),
            fileList[number - 1].name
        )
        return
    }

    if (intent.intent === 'remove-file') {
        const number = intent.number
        if (number - 1 >= fileList.length || number - 1 < 0) {
            yield `现在群里没有编号为${number}的文件`
            return
        }
        const name = fileList[number - 1].name
        const cleanName = name.replace(/wechaty\/[^/]+\//, '')
        await removeObject(fileList[number - 1].fileid)
        await removeData(fileList[number - 1].fileid)
        yield `文件“${cleanName}”删除成功`
        return
    }
}

export async function retag(msg, intent) {
    const fileInfo = await listData(`wechaty/${intent.contactId}`, 0, 1, false)
    if (!fileInfo.length) {
        msg.say('您还没有保存过文件！')
        return
    }
    const lastFile = fileInfo[0]
    lastFile.tags.push(intent.newTag)
    await updateData(lastFile)
}