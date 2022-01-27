import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('biaoqian_test.js 👋',() => {
    
////////////////////
// 标签检测
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
                return '标签'
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "todo",
            isRoom: false,
            text: null , 
        }
    }

    item.payload.text = item.msg.text()
    item.result.text = item.msg.text()
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '/标签'
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "todo",
            isRoom: false,
            text: null , 
        }
    }

    item.payload.text = item.msg.text()
    item.result.text = '标签'
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '/标签 asd'
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "retag",
            isRoom: false,
            text: null , 
            newTag: " asd"
        }
    }

    item.payload.text = item.msg.text()
    item.result.text = '/标签 asd'
    tests.push(item)

    for (const item of tests) {
        it(item.msg.text(), async () => {
            const _res = await textIntentDetect(item.msg, item.payload)
            assert.deepEqual(_res, item.result)
        }) 
    }
});
 


    