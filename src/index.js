
import process from 'process'
import { ScanStatus, log } from 'wechaty'
import QrcodeTerminal from 'qrcode-terminal'

import { intentDetect } from './intent-detect.js'
import { policy } from './policy.js'
import { morningJob, nightJob, reminder } from './components/cron/index.js'
import { todoJob } from './components/todo/index.js'
import { getVersion } from './components/version.js'

import { bot } from './bot.js'
import './backend/backend.js'
import { remindJob } from './components/text-recognizers/index.js'

morningJob(x => todoJob(bot, x))
nightJob(x => todoJob(bot, x))
reminder(() => remindJob())

/**
 * 扫码事件
 * @param {*} qrcode 二维码信息
 * @param {*} status 状态
 */
function onScan(qrcode, status) {
    if (status === ScanStatus.Waiting) {
        QrcodeTerminal.generate(qrcode, {
            small: true
        })
    }
}

/**
 * 登录成功事件
 * @param {*} user 登录用户
 */
async function onLogin(user) {
    console.log(`user: ${JSON.stringify(user)}`)
    if (process.env.DISABLE_VERSION) {
        return
    }
    const allRoom = await bot.Room.findAll()
    allRoom.forEach(async room => {
        const topic = await room.topic()
        if (topic && topic.match(/试用$/)) {
            await room.say(`我启动了，我的版本号是${getVersion()}`)
        }
    })
}

/**
 * 退出登录事件
 * @param {*} user 退出登录的用户
 */
async function onLogout(user) {
    log.info('StarterBot', '%s logout', user)
}


/**
 * 消息处理事件
 * @param {*} msg 消息
 */
async function onMessage(msg) {
    console.log(`message: ${JSON.stringify(msg)}`)
    const contact = msg.talker()
    // for wechaty 1.x
    // const bot = msg.wechaty.currentUser()
    const bot = msg.wechaty.userSelf()
    if (contact === bot) {
        return
    }
    const intent = await intentDetect(msg)
    console.log('intent', intent)
    await policy(msg, intent)
}

/**
 * 处理好友请求相关事件
 * @param {*} friendship 好友请求信息
 */
async function onFriendship(friendship) {
    try {
        console.log(`received friend event.`)
        switch (friendship.type()) {
        // 1. New Friend Request
        case bot.Friendship.Type.Receive:
            await friendship.accept()
            break
        // 2. Friend Ship Confirmed
        case bot.Friendship.Type.Confirm:
            console.log(`friend ship confirmed`)
            break
        }
    } catch (e) {
        console.error(e)
    }
}

bot
.on('scan', onScan)
.on('login', onLogin)
.on('logout', onLogout)
.on('message', onMessage)
.on('friendship', onFriendship)
.start()
.then(() => {
    log.info('JuziBot', 'JuziBot Started.')
})
.catch(err => {
    console.error(err)
    process.exit(1)
})
