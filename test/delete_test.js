import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('delete_test.js 👋',() => {
    
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
                return '删除文件 1 搜索群文件 '
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "remove-search-file",
            isRoom: false,
            text: null , 
            keywords : " ",
            number : 1
        }
    }

    item.payload.text = item.msg.text()
    item.result.text = item.msg.text()
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '删除文件 6 搜索文件 '
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "remove-search-file",
            isRoom: false,
            text: null , 
            keywords : " ",
            number : 6         
        }
    }

    item.payload.text = item.msg.text()
    item.result.text = item.msg.text()
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '删除文件 6 搜索文件 '
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "remove-search-file",
            isRoom: false,
            text: null , 
            keywords : " ",
            number : 6         
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
