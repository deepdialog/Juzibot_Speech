import assert from 'assert'
import { textIntentDetect } from '../../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('myfile_test.js 👋',() => {
    
////////////////////
// 我的文件 功能检测
///////////////////
   
    const tests = [];
    let item;

    item = {
        msg : {
            text: () => {
                return '我的文件'
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "list-file",
            isRoom: false,
            text: null ,      
        }
    }

    item.payload.text = item.msg.text();
    item.result.text = item.msg.text();
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '列出文件'
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "list-file",
            isRoom: false,
            text: null ,      
        }
    }

    item.payload.text = item.msg.text();
    item.result.text = item.msg.text();
    tests.push(item)
    item = {
        msg : {
            text: () => {
                return '群文件'
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "list-file",
            isRoom: false,
            text: null ,      
        }
    }

    item.payload.text = item.msg.text();
    item.result.text = item.msg.text();
    tests.push(item)
    item = {
        msg : {
            text: () => {
                return '我的文件 123'
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "list-file",
            isRoom: false,
            text: null ,      
        }
    }

    item.payload.text = item.msg.text();
    item.result.text = item.msg.text(); //不太合理
    tests.push(item)

    tests.push(item)
    item = {
        msg : {
            text: () => {
                return '我的文件a '
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "list-file",
            isRoom: false,
            text: null ,      
        }
    }

    item.payload.text = item.msg.text();
    item.result.text = item.msg.text(); //不太合理
    tests.push(item)

    for (const item of tests) {
        it(item.msg.text(), async () => {
            const _res = await textIntentDetect(item.msg, item.payload)
            assert.deepEqual(_res, item.result)
        }) 
    }

});
