
import { fileManage } from '../components/file-manage/index.js'

/**
 * 文件管理相关功能
 * @param {*} msg 消息
 * @param {*} intent 意图
 */
export async function actionFileManage(msg, intent) {
    for await(const x of fileManage(intent)) {
        await msg.say(x)
    }
}
