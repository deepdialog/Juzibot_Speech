import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import mocha from 'mocha'
var describe = mocha.describe
var it = mocha.it

describe('myfile_test.js 👋',() => {
    
////////////////////
// 文件 功能检测  
///////////////////
    const tests = [];
    let item;

    item = {
        msg : {
            text: () => {
                return '文件 1 搜索群文件 '
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "get-search-file",
            isRoom: false,
            keywords: " ",
            number : 1,
            text: null ,      
        }
    }

    item.payload.text = item.msg.text()
    item.result.text = item.msg.text()
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '文件  2 搜索群文件' //todo?
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
                return '文件  9 搜索文件 ' 
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "get-search-file",
            isRoom: false,
            text: null , 
            keywords: " ",
            number : 9     
        }
    }

    item.payload.text = item.msg.text()
    item.result.text = item.msg.text()
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '文件  9 搜索文件 '
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "get-search-file",
            isRoom: false,
            text: null , 
            keywords: " ",
            number : 9     
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
