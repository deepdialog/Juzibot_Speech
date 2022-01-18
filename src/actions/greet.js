
/**
 * 自我介绍
 * @param {*} msg 消息
 * @param {*} intent 意图
 */
export async function actionGreet(msg) {
    await msg.say('你好，我是JuziBot，我能帮你处理文档、图片和一些想法的信息管理、搜索和归类，我也包含一些娱乐功能')
}
