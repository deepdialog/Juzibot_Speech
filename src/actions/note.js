
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { addData, searchLastNote, updateData } from '../components/search/index.js'
import { recognizeText } from '../components/text-recognizers/index.js'

/**
 * 笔记相关
 * @param {*} msg 消息
 * @param {*} intent 意图
 */
export async function actionSaveNote(msg, intent) {
    const path = `wechaty/${intent.contactId}`
    let meta
    const lastNote = await searchLastNote(path)
    console.log(lastNote);
    var appendFlag = lastNote && true
    if (appendFlag) {
        const now = intent.beginTime

        const secondsPass = (now.diff(moment(lastNote.createdAt, 'YYYY-MM-DD HH:mm:ss'), 's'))
        appendFlag = secondsPass <= 30
    }
    if (!appendFlag) {
        const name = path + '/' + moment().format('YYYY-MM-DD_HH:mm:ss') + '_笔记.txt'
        meta = {
            name,
            fileType: 'note',
            contactId: intent.contactId.toString(),
            path,
            title: '',
            content: '',
            tags: ['note'],
            date: '',
            user: msg.talker().payload,
            room: !!intent.room,
            url: '',
            filesize: 0,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            fileid: uuidv4(),
        }
    }

    if (!appendFlag) {
        meta.content = intent.text
        meta.tags = meta.tags.concat(await recognizeText(msg, intent))
        console.log(meta);
        await addData(meta)
    } else {
        lastNote.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
        lastNote.content += "\n" + intent.text
        lastNote.tags = lastNote.tags.concat(await recognizeText(msg, intent))
        lastNote.tags = Array.from(new Set(lastNote.tags))
        await updateData(lastNote)
    }

}
