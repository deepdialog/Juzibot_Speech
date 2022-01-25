/**
 * 意图识别模块
 * 意图识别是指识别一条信息的意图，只记录上下文历史，但是不根据上下文历史判断意图
 * 结合上下文历史（例如历史意图，上一轮意图）的去做判断留给下一个policy环节
 */

// import { Message } from 'wechaty'
import { bot } from './bot.js'
import { queryIntent } from './intent-query-detect.js'
import moment from 'moment'

/**
 * 消息意图识别，识别后的意图会提交给policy
 * @param msg 消息
 * @returns 意图
 * file: 文件保存意图
 * url: 链接意图
 * search-file
 * get-search-file
 * remove-search-file
 * list-file
 * get-file
 * remove-file
 * greet : 介绍自己
 * bye : 再见
 */
export async function intentDetect(msg) {

    const contact = msg.talker()
    // for wechaty 1.x
    // const bot = msg.wechaty.currentUser()
    const bot = msg.wechaty.userSelf()
    if (contact === bot) {
        return {
            intent: null
        }
    }
    const room = msg.room()

    let payload = {
        roomTopic: null,
        isRoom: false,
        text: msg.text()
    }
    if (room) {
        const topic = await room.topic()
        payload.roomTopic = topic
        payload.isRoom = true
        payload.contactId = room.id
        payload.mentionSelf = await msg.mentionSelf()
        payload.room = room
        payload.contactName = contact.name()
    } else {
        payload.contactId = contact.id
        payload.contactName = contact.name()
    }

    const intent = await msgIntentDetect(msg, payload)

    return intent
}

/**
 * 处理不同的message类型
 * @param msg 消息
 * @param payload 一些上下文
 * @returns 一个包含意图的结构体
 */
export async function msgIntentDetect(msg, payload) {
    
    // https://wechaty.js.org/docs/api/message/#messagetype--messagetype

    // 文件意图保存
    if ([
        bot.Message.Type.Attachment,  // 包括文档
    ].includes(msg.type())) {

        // console.log("111111111111\n11111111111111\n1111111111\n");
        // console.log(msg);
        // console.log("111111111111\n11111111111111\n1111111111\n");


        const fileBox = await msg.toFileBox()
        return {
            ...payload,
            intent: 'file',
            file: fileBox,
        }
    }

    // 图片意图保存
    if ([
        bot.Message.Type.Image,
    ].includes(msg.type())) {
        const fileBox = await msg.toFileBox()


        return {
            ...payload,
            intent: 'file',
            file: fileBox,
        }
    }

    // 链接保存
    if ([
        bot.Message.Type.Url
    ].includes(msg.type())) {
        // https://github.com/wechaty/wechaty/blob/b979b0162ce57d2f9aeb7683a504faa75514196b/src/user/url-link.ts
        const urlLink = await msg.toUrlLink()
        return {
            ...payload,
            intent: 'url',
            url: urlLink.url(),
            title: urlLink.title(),
            thumbnailUrl: urlLink.thumbnailUrl(),
            description: urlLink.description(),
        }
    }
    // TODO: 语音
    if ([
        bot.Message.Type.Audio
    ].includes(msg.type())) {
        console.log(msg.text);
        const fileBox = await msg.toFileBox()
        return {
            ...payload,
            intent: 'file',
            file: fileBox,
        }
    }

    // TODO: Video
    //
    //

    // 纯文本
    if ([
        bot.Message.Type.Text,
    ].includes(msg.type())) {
        return await textIntentDetect(msg, payload)
    }

    // TODO: 这些暂不处理
    // MessageType.Unknown
    // MessageType.Contact
    // MessageType.Emoticon
    return {
        ...payload,
        intent: null,
    }
}

/**
 * 文本意图的识别
 * @param msg 消息
 * @param payload 一些附加状态
 * @returns 意图
 */
export async function textIntentDetect(msg, payload) {
    let text = msg.text()

    // 去掉可能的 @xxx
    if (payload.isRoom && payload.mentionSelf) {
        text = text.replace(/@[^\s]+\s+/g, '').trim()
    }

    const urlExists = text.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
    if (urlExists) {
        const url = urlExists[0]
        return {
            ...payload,
            intent: 'url',
            url,
        }
    }

    /**
     * 这里这里具有顺序性，笔记优先级高
     */

    let m
    // 群里，如果不是用“/”、“\” "#" "小橘" "小橘子" "橘子" "桔子" "小桔子"开头，或者没有at机器人，则作为纯文本
    // 纯文本将以笔记的形式记录/追加到文件中
    if (payload.isRoom && !payload.mentionSelf && !text.match(/^\/|\\|#|小橘|小橘子|橘子|桔子|小桔子/)) {
        payload.text = text
        return {
            ...payload,
            intent: 'end-note',
            beginTime: moment(new Date())
        }
    }
    // 去掉强制操作字符“/”或者“\”开头
    // if (payload.isRoom) {
        text = text.replace(/^\/|\\|#|小橘|小橘子|橘子|桔子|小桔子/, '')
    // }
    if (text.match(/^意图管理$/)) {
        return {
            ...payload,
            intent: 'intent-manage',
        }
    }

    if (text.match(/成熟的机器人/) && text.match(/更新重启/)) {
        return {
            ...payload,
            intent: 'reboot',
        }
    }
    
    m = text.match(/^(标签)(.+)$/)
    if (m) {
        return {
            ...payload,
            intent: 'retag',
            newTag: m[2]
        }
    }

    m = text.match(/^(搜索)(群文件|文件)?(.+)$/)
    if (m) {
        return {
            ...payload,
            intent: 'search-file',
            keywords: m[3].trim(),
        }
    }

    m = text.match(/^文件\s*(\d+)\s*(搜索)(文件|群文件)(.+)/)
    if (m) {
        return {
            ...payload,
            intent: 'get-search-file',
            number: Number.parseInt(m[1]),
            keywords: m[4],
        }
    }

    m = text.match(/^删除文件\s*(\d+)\s*(搜索文件|搜索群文件)(.+)/)
    if (m) {
        return {
            ...payload,
            intent: 'remove-search-file',
            number: Number.parseInt(m[1]),
            keywords: m[3],
        }
    }

    m = text.match(/^(我的文件|列出文件|群文件)$/)
    if (m) {
        return {
            ...payload,
            intent: 'list-file',
        }
    }

    m = text.match(/^文件\s*(\d+)$/)
    if (m) {
        return {
            ...payload,
            intent: 'get-file',
            number: Number.parseInt(m[1]),
        }
    }

    m = text.match(/^删除文件\s*(\d+)$/)
    if (m) {
        return {
            ...payload,
            intent: 'remove-file',
            number: Number.parseInt(m[1]),
        }
    }

    const intentFromQuerySelf = await queryIntent(text, payload.contactId)
    if (intentFromQuerySelf) {
        return {
            ...payload,
            intent: 'user-custom',
            answer: intentFromQuerySelf,
        }
    }

    const intentFromQuery = await queryIntent(text)
    if (intentFromQuery) {
        return {
            ...payload,
            intent: intentFromQuery,
        }
    }

    // 若没有匹配以上命令，则作为todo，交由text-recognizer处理更复杂的内容
    payload.text = text
    return {
        ...payload,
        intent: 'todo',
    }
}
