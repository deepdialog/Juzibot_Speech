/**
 * 决策模块
 * 结合意图与上下文历史，判断需要执行什么action，并且准备好action所需的参数，传输给对应的action
 */

import { actionSaveFile } from './actions/save-file.js'
import { actionSaveUrl } from './actions/save-url.js'
import { actionFileManage } from './actions/file-manage.js'
import { actionReboot } from './actions/reboot.js'
import { actionBye } from './actions/bye.js'
import { actionGreet } from './actions/greet.js'
import { actionSaveNote} from './actions/note.js'
import { actionIntentManage } from './actions/custom-intent.js'
import { actionRetag } from './actions/retag.js'
import { actionAddTodo } from './actions/todo.js'

/**
 * 处理意图，根据意图去调用actions
 * @param msg 消息
 * @param intent 意图
 * file: 文件保存意图
 * url: 链接意图
 * search-file
 * get-search-file
 * remove-search-file
 * list-file
 * get-file
 * remove-file
 */
export async function policy(msg, intent) {
    // 意图管理
    if ('intent-manage' === intent.intent) {
        return await actionIntentManage(msg, intent)
    }

    // 自定义标签
    if ('retag' === intent.intent) {
        return await actionRetag(msg, intent)
    }

    if ('todo' === intent.intent) {
        return await actionAddTodo(msg, intent)
    }
    
    // 合并单行/多行笔记
    // 多行笔记结束
    if ('end-note' === intent.intent) {
        return await actionSaveNote(msg, intent)
    }

    // 用户自定义的问答对
    if ('user-custom' === intent.intent) {
        return await msg.say(intent.answer)
    }

    // 问候与自我介绍
    if ('greet' === intent.intent) {
        return await actionGreet(msg, intent)
    }

    // 再见与挽留
    if ('bye' === intent.intent) {
        return await actionBye(msg, intent)
    }

    // 自动重启
    if ('reboot' === intent.intent) {
        return await actionReboot(msg, intent)
    }

    // 文件存储
    if ('file' === intent.intent) {
        return await actionSaveFile(msg, intent.contactId, intent.room, intent.file)
    }

    // url存储
    if ('url' === intent.intent) {
        return await actionSaveUrl(msg, intent)
    }

    // 文件管理相关
    const fileManageIntent = [
        'search-file',
        'get-search-file',
        'remove-search-file',
        'list-file',
        'get-file',
        'remove-file'
    ]
    if (fileManageIntent.includes(intent.intent)
    ) {
        return await actionFileManage(msg, intent)
    }
}
