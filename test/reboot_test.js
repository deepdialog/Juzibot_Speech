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

    // var _expected_value_4 = {
    
    // intent: null,
    // isRoom: false,
    // roomTopic: null,
    // text: args_4.text()
    // }

    // var _expected_value_4 = fs.readFileSync('test/reboot.txt','utf-8');
    // const xx  = await textIntentDetect(args_4,payload_4);
    // console.log(xx);


    it('更新重启指令', async () => {
        const query = { roomTopic: null, isRoom: false, text: '更新重启', intent: 'todo' };
        const _res_4 = await textIntentDetect(args_4,payload_4); 
        //console.log([a[4],a[7]]);
        //console.log("123");
        //console.log(JSON.stringify(_res_4)); 
        assert.deepEqual(query,_res_4);
        //assert.deepEqual(1,1);
    });
})