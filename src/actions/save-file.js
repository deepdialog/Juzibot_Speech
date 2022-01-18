
import { saveFile } from '../components/file-manage/index.js'

/**
 * 文件保存相关
 * @param {*} msg 消息
 * @param {*} intent 意图
 */
export async function actionSaveFile(msg, contactId, room, fileBox) {
    for await(const x of saveFile(contactId, room, fileBox, msg.talker().payload)) {
        await msg.say(x)
    }
}
