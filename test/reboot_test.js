import assert from 'assert'
import { intentDetect } from '../src/intent-detect.js'  // 待测试
import { textIntentDetect } from '../src/intent-detect.js' //测试
import { bot } from '../src/bot.js'
import { url } from 'inspector'
import fs from 'fs'

describe('reboot_test.js 👋',() => {
// /////////////
// 更新重启&&成熟的机器人 _4
// /////////////
    const args_4 = {
    text: () => {
        return '更新重启'
        }
    }

    let payload_4 = {
    roomTopic: null,
    isRoom: false,
    text: args_4.text()
    }

    it('更新重启指令', async () => {
        const query = { roomTopic: null, isRoom: false, text: '更新重启', intent: 'todo' };
        const _res_4 = await textIntentDetect(args_4,payload_4); 
        assert.deepEqual(query,_res_4);
    });
})