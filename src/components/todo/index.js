
import  { Client } from '@opensearch-project/opensearch'
import process from 'process'
import moment from 'moment'

const INDEX = process.env.TODO_ES_INDEX || 'juzibot_todo'
const client = new Client({
    node: process.env.ES_ADDR || 'https://admin:admin@localhost:9200/',
    ssl: {
        rejectUnauthorized: false,
    },
})

/**
 * 添加一个todo
 * @param {*} obj todo内容
 */
export async function addTodo(obj) {
    await client.index({
        id: obj.id,
        index: INDEX,
        body: obj,
    })
}

/**
 * 更新todo对象
 * @param {*} obj todo内容
 */
export async function updateTodo(obj) {
    await client.index({
        id: obj.id,
        index: INDEX,
        body: obj,
    })
}

/**
 * 删除todo对象
 * @param {*} id todo的id
 */
export async function removeTodo(id) {
    await client.deleteByQuery({
        index: INDEX,
        body: {
            query: {
                term: {
                    'id.keyword': id,
                }
            }
        }
    })
    await client.indices.refresh({ index: INDEX })
}

/**
 * 列出最近多少duration秒内的todo
 * @param {*} duration 秒数
 */
 export async function listComingTodo(duration = 360) {
    const body = {
        query: {
            range: {
                time: {
                    lte: moment().add(duration, 's')
                }
            }
        },
        "track_total_hits": true,
    }
    
    console.log('search: body %s', JSON.stringify(body, null, 2))
    try {
        const result = await client.search({
            index: INDEX,
            body
        })
        return result['body']['hits']['hits'].map(t => t._source)
    } catch (err) {
        console.error(err)
        return []
    }
}
/**
 * 列出todo
 * @param {*} contactId 联系人
 * @param {*} status 状态
 * @returns todo信息
 */
export async function listTodo(contactId=null, status=null, from=0, size=10) {
    const body = {
        query: {
            bool: {
                must: [
                    {
                        match_all: {}
                    }
                ]
            }
        },
        sort: [
            {
                "createdAt.keyword" : "desc",
            }
        ],
        from,
        size,
        "track_total_hits": true,
    }
    if (contactId) {
        body.query = {
            bool: {
                must: [
                    {
                        term: {
                            'contactId.keyword': contactId,
                        }
                    }
                ]
            }
        }
    }
    if (status) {
        body.query.bool.must.push({
            term: {
                'status.keyword': status,
            }
        })
    }
    console.log('search: body %s', JSON.stringify(body, null, 2))
    try {
        const result = await client.search({
            index: INDEX,
            body
        })
        return {
            data: result['body']['hits']['hits'].map(t => t._source),
            total: result['body']['hits']['total']['value'],
        }
    } catch (err) {
        console.error(err)
        return {
            data: [],
            total: 0,
        }
    }
}

/**
 * 生成用于早间/晚间提醒的文本，如果有todo的话
 * @param {*} bot 机器人
 * @param {*} time 时间，morning/night
 * @returns 用于早间/晚间提醒的文本
 */
export async function todoJob(bot, time) {
    const pendingTodos = await listTodo(null, 'pending', 0, 1000)

    const todoById = {}
    pendingTodos.data.forEach(todo => {
        if (!todoById[todo.contactId]) {
            todoById[todo.contactId] = [todo]
        } else {
            todoById[todo.contactId].push(todo)
        }
    })

    const doneTodos = await listTodo(null, 'done', 0, 1000)
    const doneTodoById = {}
    doneTodos.data.forEach(todo => {
        if (!doneTodoById[todo.contactId]) {
            doneTodoById[todo.contactId] = [todo]
        } else {
            doneTodoById[todo.contactId].push(todo)
        }
    })

    if (!bot) {
        return
    }
    const contactList = await bot.Contact.findAll()
    const roomList = await bot.Room.findAll()
    const contactById = {}
    contactList.forEach(c => contactById[c.id] = c)
    roomList.forEach(r => contactById[r.id] = r)

    for (const contactId in todoById) {
        if (!contactById[contactId]) {
            continue
        }
        const todos = todoById[contactId]
        const todayBegin = moment().format('YYYY-MM-DD') + ' 00:00:00'
        const todayEnd = moment().format('YYYY-MM-DD') + ' 23:59:59'
        const doneTodos = (doneTodoById[contactId] ?? []).filter(todo => {
            if (todo && todo.doneAt && todo.doneAt >= todayBegin && todo.doneAt <= todayEnd) {
                return true
            }
            return false
        })

        let msg
        if (todos.length && time === 'morning') {
            msg = `你的早间提醒，你有${todos.length}条没完成的待办事项：\n` + todos.map((x, i) => `${i + 1}：${x.todo}`).join('\n')
        } else if ((todos.length || doneTodos.length) && time === 'night') {
            msg = `你的晚间提醒，`
            if (doneTodos && doneTodos.length) {
                if (doneTodos.length) {
                    msg += `今天完成了${doneTodos.length}条待办事项，好棒：\n`
                    msg += doneTodos.map(x => `【完成】${x.todo}`).join('\n')
                }
            }
            if (todos && todos.length) {
                if (doneTodos && doneTodos.length) {
                    msg += '\n'
                }
                msg += `你有${todos.length}条没完成的待办事项：\n` + todos.map((x, i) => `${i + 1}：${x.todo}`).join('\n')
            }
        }
        if (msg) {
            await contactById[contactId].say(msg)
        }
    }
}

// await todoJob()
