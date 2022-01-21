import assert from 'assert'
import { intentDetect } from '../src/intent-detect.js'  // 待测试
import { textIntentDetect } from '../src/intent-detect.js' //测试
import { bot } from '../src/bot.js'
import { url } from 'inspector'
import fs from 'fs'

describe('keyword_jz.js 👋',() => {
    
////////////////////
// 小橘子 橘子 关键字检测
///////////////////

    const args_3 = {
        text: () => {
            return '橘子'
        }
    }
    let payload_3 = {
        roomTopic: null,
        isRoom: false,
        text: args_3.text()
    }
    var _expected_value_3 = {
        roomTopic: null,
        isRoom: false,
        text: 'a',
        intent: 'url',
        url: 'https://me.w0x7ce.eu'
    }

    it('🍊提取', async () => {
        const query3= { roomTopic: null, isRoom: false, text: '', intent: 'todo' };
        const _res_3 = await textIntentDetect(args_3,payload_3); 
        assert.deepEqual(_res_3,query3);
    });

  
 
});
    