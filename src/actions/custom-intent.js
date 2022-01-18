/**
 * 提示意图管理地址
 * @param {*} msg 消息
 * @param {*} intent 意图
 */
 export async function actionIntentManage(msg, intent) {
    return await msg.say(
        `意图管理点击：\nhttps://chat-assist.juzibot.com/intent/${encodeURIComponent(intent.contactId)}`
    )
}
