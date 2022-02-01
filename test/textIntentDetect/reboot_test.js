import assert from 'assert'
import { textIntentDetect } from '../../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('reboot_test.js 👋',() => {
// /////////////
// 更新重启&&成熟的机器人 _4
// /////////////
    const tests = [];
    let item;
    item = {
        msg : {
            text: () => {
                return '成熟的机器人'
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

    item.payload.text = item.msg.text();
    item.result.text = item.msg.text();
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '更新重启'
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

    item.payload.text = item.msg.text();
    item.result.text = item.msg.text();
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '更新重启 123'
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

    item.payload.text = item.msg.text();
    item.result.text = item.msg.text();
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '更新重启 @123 /123'
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

    item.payload.text = item.msg.text();
    item.result.text = item.msg.text();
    tests.push(item)
   
    for (const item of tests) {
        it(item.msg.text(), async () => {
            const _res = await textIntentDetect(item.msg, item.payload)
            assert.deepEqual(_res, item.result)
        }) 
    }
})
