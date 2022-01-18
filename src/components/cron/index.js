/**
 * 据设定的crontab设置，调用函数
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
 */

import cron from 'node-cron'

/**
 * 早晨调用
 * @param {*} func 待调用的函数
*/
export async function morningJob(func) {
    console.log('register task morning')
    cron.schedule('30 9 * * *', () => {
        console.log('task in morning')
        func('morning')
    })
}

/**
 * 晚间调用
 * @param {*} func 待调用的函数
 */
export async function nightJob(func) {
    console.log('register task night')
    cron.schedule('30 21 * * *', () => {
        console.log('task in night')
        func('night')
    })
}

/**
 * 任务定时提醒
 * @param {*} func 待调用的函数
 */
export async function reminder(func) {
    console.log('register task reminder')
    cron.schedule('*/5 * * * *', () => { // 每隔五分钟定时提醒
        console.log('task reminder')
        func()
    })
}