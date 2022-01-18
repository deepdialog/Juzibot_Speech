/**
 * 这个模块单纯是把web后台运行在另一个线程
 */

import { Worker } from 'worker_threads'

export const worker = new Worker('./src/backend/server.js')

import { FileBox } from 'file-box'
import { getObject } from '../components/minio/index.js'
import { bot } from '../bot.js'

/**
 * 接收web端来的消息，并控制bot
 */
 async function onMessage(message) {
    console.log('message', message)
    if (message.event === 'sendfile') {
        const contactList = await bot.Contact.findAll()
        const roomList = await bot.Room.findAll()
        const contactById = {}
        contactList.forEach(c => contactById[c.id] = c)
        roomList.forEach(r => contactById[r.id] = r)
        if (contactById[message.contact]) {
            const file = await getObject(message.fileid)
            if (file) {
                contactById[message.contact].say(FileBox.fromBuffer(file, message.name))
            }
        }
    }
}

worker.on('message', onMessage)
