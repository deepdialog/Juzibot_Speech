import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('filesearch_test.js 👋',() => {
    
////////////////////
// 搜索指令测试
///////////////////

    const args_5 = {
        text: () => {
            return '搜索文件 a.txt'
        }
    }    
    let payload_5 = {
        roomTopic: null,
        isRoom: false,
        text: args_5.text()
    }
    it('🔍搜索指令测试', async () => {
        const _expected_value_5= {
            roomTopic: null,
            isRoom: false,
            text: '搜索文件 a.txt',
            intent: 'search-file',
            keywords: 'a.txt'
        }
        const _res_5 = await textIntentDetect(args_5,payload_5);    
        assert.deepEqual(_res_5,_expected_value_5);
    });
});

    