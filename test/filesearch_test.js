import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('filesearch_test.js 👋',() => {
    
////////////////////
// 搜索指令测试
///////////////////

    var test_msg = new Array();
    var test_payload = new Array();
    var test_result = new Array();
    var i = 1;

    const tests = [];
    let item;

    item = {
        msg : {
            text: () => {
                return '搜索文件'
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "search-file",
            isRoom: false,
            keywords: "文件",
            text: null ,      
        }
    }

    item.payload.text = item.msg.text()
    item.result.text = item.msg.text()
    tests.push(item)

    
    item = {
        msg : {
            text: () => {
                return '搜索群文件'
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "search-file",
            isRoom: false,
            keywords: "群文件",
            text: null ,      
        }
    }

    

    item.payload.text = item.msg.text()
    item.result.text = item.msg.text()
    tests.push(item)

    for (const item of tests) {
        it(item.msg.text(), async () => {
            const _res = await textIntentDetect(item.msg, item.payload)
            assert.deepEqual(_res, item.result)
        }) 
    }
});