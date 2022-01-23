import assert from 'assert'
import { intentDetect } from '../src/intent-detect.js'  // 待测试
import { textIntentDetect } from '../src/intent-detect.js' //测试
import { bot } from '../src/bot.js'
import { url } from 'inspector'
import fs from 'fs'

describe('delete_test.js 👋',() => {
    
////////////////////
// 标签检测
///////////////////

    const args_7 = {
        text: () => {
            return '删除文件 txt.jpg'
        }
    }
    let payload_7 = {
        roomTopic: null,
        isRoom: false,
        text: args_7.text()
    }
    var _expected_value_7 = {
        roomTopic: null,
        isRoom: false,
        text: '删除文件 txt.jpg',
        intent: 'todo'
      }
    it('🚮删除文件', async () => {
        
        const _res_7 = await textIntentDetect(args_7,payload_7); 
        //console.log(_res_7);
        assert.deepEqual(_res_7,_expected_value_7);
    });
});


    