
// import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

import { listTodo, updateTodo } from "../components/todo/index.js"
import { recognizeTodo } from '../components/text-recognizers/index.js'

/**
 * 添加待办事项功能
 * @param {*} msg 消息
 * @param {*} intent 意图
 */
export async function actionAddTodo(msg, intent) {
    return await recognizeTodo(msg, intent)
}

/**
 * 列出待办事项，只列出最后10条，更多点击web版本查看
 * @param {*} msg 消息
 * @param {*} intent 意图
 */
export async function actionListTodo(msg, intent) {
    const todos = await listTodo(intent.contactId, intent.status, 0, 10)
    if (!todos.total) {
        return await msg.say('当前你没有待办事项/ToDo哦')
    }

    if (todos.total <= 10) {
        await msg.say(`我帮你找到了${todos.total}条记录：\n` + todos.data.map((x, i) => `${i + 1}：${x.todo}`).join('\n'))
    } else {
        const remaind = todos.total - 10
        let m = `我帮你找到了${todos.total}条记录：\n`
        m += todos.data.map((x, i) => `${i + 1}：${x.todo}`).join('\n')
        m += `\n你还有${remaind}条记录，点击：https://chat-assist.juzibot.com/todo/${encodeURIComponent(intent.contactId)}`
        await msg.say(m)
    }
}

/**
 * 把todo标记为完成
 * @param {*} msg 消息
 * @param {*} intent 意图
 */
export async function actionMarkTodo(msg, intent) {
    const todos = await listTodo(intent.contactId, 'pending', 0, 1000)
    if (!todos.total) {
        return await msg.say('当前你没有待办事项/ToDo哦')
    }
    const number = intent.number - 1
    if (number < 0 || number >= todos.total) {
        return await msg.say('我没有找到这个编号的待办事项/ToDo哦')
    }
    todos.data[number].status = 'done'
    todos.data[number].doneAt = moment().format('YYYY-MM-DD HH:mm:ss')
    updateTodo(todos.data[number])
    await msg.say(`我帮你把这条待办事项/ToDo标记了哦：“${todos.data[number].todo}”`)
}
