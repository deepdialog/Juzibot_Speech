import {
    recognizeDateTime,
    Culture,
    recognizePhoneNumber,
    recognizeEmail
} from "@microsoft/recognizers-text-suite";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid'
import { bot } from "../../bot.js";
import { addTodo, updateTodo, removeTodo, listComingTodo } from "../todo/index.js";

const Freq = {
    ANUALLY: 'y',
    MONTHLY: 'm',
    WEEKLY: 'w',
    DAILY: 'd'
}

const contactById = {}
/**
 * 识别纯文本中的信息
 * @param {*} msg 消息
 * @param {*} intent 意图
 */
export async function recognizeText(msg, intent) {
    const text = intent.text
    const ret = [...text.matchAll(/(.*?)#([\S]+?)[#| ](.*?)/g)].map(x => x[2])
    const m = text.match(/(.*?)#([\S]+?)$/)
    if (m) {
        ret.push(m[2])
    }
    if (ret.length != 0) {
        return ret
    }
    ret.push('')
    const culture = Culture.Chinese
    let rec
    for (const line of text.split("\n")) {
        rec = recognizePhoneNumber(line, culture)
        if (rec.length) {
            ret.push('电话')
        }
        rec = recognizeEmail(line, culture)
        if (rec.length) {
            ret.push('邮箱')
        }
    }
    return Array.from(new Set(ret))
}

/**
 * 
 */
export async function recognizeTodo(msg, intent) {
    if (!contactById[intent.contactId]) {
        contactById[intent.contactId] = msg
    }
    const culture = Culture.Chinese
    const text = intent.text
    var msgs = ''
    let rec
    for (var line of text.split("\n")) {
        var freq = null
        if (line.search('每年') != -1) {
            freq = Freq.ANUALLY
            line = line.replace('每年', '')
        } else if (line.search('每月') != -1) {
            freq = Freq.MONTHLY
            line = line.replace('每月', '')
        } else if (line.search('每周') != -1 || line.search('每星期') != -1) {
            freq = Freq.WEEKLY
            line = line.replace('每周', '').replace('每星期', '')
        } else if (line.search('每天') != -1 || line.search('每日') != -1) {
            freq = Freq.DAILY
            line = line.replace('每日', '').replace('每天', '')
        }
        rec = recognizeDateTime(line, culture)
        if (rec.length == 0) {
            const tmp = recognizeDateTime(line.replace('.', '月'), culture)
            if (tmp.length != 0) {
                rec = tmp
            }
        }
        if (rec.length == 1) {
            var val = rec[0].resolution.values[0]
            const type = val.type
            var time = val.value
            var nineOclock = false
            let dateTime
            if (type === 'datetime') {
                dateTime = moment(time, 'YYYY-MM-DD hh:mm:ss')
                if (dateTime < moment()) {
                    time = rec[0].resolution.values.slice(-1)[0].value
                    dateTime = moment(time, 'YYYY-MM-DD hh:mm:ss')
                }
            } else if (type === 'time') {
                dateTime = moment(time, 'hh:mm:ss')
                if (dateTime < moment()) {
                    dateTime = dateTime.add(1, 'd')
                }
            } else if (type === 'date') {
                dateTime = moment(time, 'YYYY-MM-DD').add(9, 'h')
                if (dateTime < moment()) {
                    dateTime = dateTime.add(1, 'y')
                }
                nineOclock = true
            } else if (type === 'duration') {
                const today = (new Date()).toLocaleDateString()
                dateTime = moment(today, "YYYY/MM/DD").add(parseInt(time) / 3600 + 9, 'h')
                nineOclock = true
            }
            if (dateTime >= moment()) {
                addTodo({
                    id: uuidv4(),
                    todo: line,
                    contactId: intent.contactId,
                    time: dateTime,
                    freq,
                })

                var day = dateTime.day() == moment().day() ? '今天' :'明天'
                const localeString = dateTime.toDate().toLocaleString()

                if (dateTime.diff(moment(), 'd') > 1) {
                    day = localeString.substring(0, localeString.indexOf(' '))
                    if (dateTime.year() == moment().year()) {
                        day = day.substr(5)
                    }
                }

                const time = localeString.substring(localeString.indexOf(' ') + 1, localeString.indexOf(':') + 3)

                msgs += `我${day}${time}提醒你哦\n`
                if (nineOclock) {
                    addTodo({
                        id: uuidv4(),
                        todo: line,
                        contactId: intent.contactId,
                        time: dateTime.add(12, 'h'),
                        freq,
                    })
                }
            } else {
                // console.log(dateTime);
                msgs += '过去的时间无法提醒哦～\n'
            }
        } else if (rec.length > 1) {
            msgs += '小橘子计算不过来啦～\n'
        } else {
            let remindTime
            if (moment().hour() >= 9) {
                if (moment().hour() >= 21) {
                    msgs += "我明早九点提醒你哦\n"
                    remindTime = moment("09", "hh").add(24, 'h')
                } else {
                    msgs += "我晚上九点提醒你哦\n"
                    remindTime = moment("21", "hh")
                }
            } else {
                msgs += "我早上九点提醒你哦\n"
                remindTime = moment("09", "hh")
            }
            addTodo({
                id: uuidv4(),
                todo: line,
                contactId: intent.contactId,
                time: remindTime,
                freq,
            })
        }
    }
    // TODO: todo 页面
    msg.say(msgs + `更多todo管理点击这里：https://...`)
}

/**
 * 待办的定时提醒
 */
export async function remindJob() {
    const jobsById = {}
    // 由于每隔五分钟会扫描内存中的待办并提醒
    // 这里设置为当最近的待办距现在不足6分钟便提醒
    const comingJobs = await listComingTodo(360)
    for (const job of comingJobs) {
        if (!jobsById[job.contactId]) {
            jobsById[job.contactId] = ''
        }
        jobsById[job.contactId] += '\n' + job.todo
        if (job.freq) {
            job.time = moment(job.time).add(1, job.freq)
            await updateTodo(job)
        } else {
            await removeTodo(job.id)
        }
    }
    for (const contactId in jobsById) {
        console.log(contactId);
        if (!contactById[contactId]) {
            const contact = await bot.Contact.find({ id: contactId })
            if (!contact) {
                continue
            }
            contactById[contactId] = contact
        }
        contactById[contactId].say(
            `您的待办提醒：${jobsById[contactId]}`
        )
    }
}