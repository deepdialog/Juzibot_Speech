
// import process from "process"
import fetch from 'node-fetch'

/**
 * 重启功能
 * @param {*} msg 消息
 * @param {*} intent 意图
 */
export async function actionReboot(msg) {
    await msg.say('好的，我试试看能不能做到')
    await fetch('http://localhost:8900/hooks/reboot-juzibot')
}
