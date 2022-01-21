import assert from 'assert'
import { intentDetect } from '../src/intent-detect.js'  // 待测试
import { textIntentDetect } from '../src/intent-detect.js' //测试
import { bot } from '../src/bot.js'
import { url } from 'inspector'
import fs from 'fs'

describe('url_name_test.js 👋',() => {
    
////////////////////
// 去掉可能的 @xxx _1
///////////////////

    const args_1 = {
        text: () => {
        return '123 @abc https://me.w0x7ce.eu'
            }
    }
    let payload_1 = {
        roomTopic: null,
        isRoom: false,
        text: args_1.text()
    }
    var _expected_value_1 = {
        roomTopic: null,
        isRoom: false,
        text: '123 @abc https://me.w0x7ce.eu',
        intent: 'url',
        url: 'https://me.w0x7ce.eu'
    }

    it('去掉可能的@', async () => {
        const _res_1 = await textIntentDetect(args_1,payload_1); 
        assert.deepEqual(_res_1,_expected_value_1);
    });

    // ////////////////
    // 网址识别功能 _2
    ///////////////
    const args_2 = {
        text: () => {
        return 'https://me.w0x7ce.eu/abc@12'
        }
    }

    let payload_2 = {
        roomTopic: null,
        isRoom: false,
        text: args_2.text()
    }

    var _expected_value_2 = {
        roomTopic: null,
        isRoom: false,
        text: args_2.text(),
        intent: 'url',
        url: 'https://me.w0x7ce.eu/abc@12'
    }


    it('确保URL提取正常', async () => {
        const _res_2 = await textIntentDetect(args_2,payload_2); 
        assert.deepEqual(_res_2,_expected_value_2);
    });
});
    