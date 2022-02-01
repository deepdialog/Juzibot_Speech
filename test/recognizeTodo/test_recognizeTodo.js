import assert from 'assert'
import { recognizeTodo } from '../../src/components/text-recognizers/index.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('test_recognizeTodo__11.js 👋',() => {
    
////////////////////
// 标签检测
///////////////////
    const tests = [];
    let item;

    item = {
        msg : {
            text: () => {
                return '明天两点'
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
        },

        intent : {
            contactId : 1,

        },
        recognizeTodo_result : "我明天2:00提醒你哦\n"
    }

    item.payload.text = item.msg.text()
    item.result.text = item.msg.text()
    item.intent.text = item.result.text
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '明天零点'
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
        },

        intent : {
            contactId : 1,

        },
        recognizeTodo_result : "我明天12:00提醒你哦\n"
    }

    item.payload.text = item.msg.text()
    item.result.text = item.msg.text()
    item.intent.text = item.result.text
    tests.push(item)

    for (const item of tests) {
        it(item.msg.text(), async () => {
            const _res = await recognizeTodo(item.msg, item.intent)
            assert.deepEqual(_res, item.recognizeTodo_result)
        }) 
    } 
});
