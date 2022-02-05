import assert from 'assert'
import { textVector } from '../../src/components/text-to-vector/index.js' //测试
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
   
    for (const item of tests) {
        it(item.msg.text(), async () => {
            const _res = await textVector("abc")
            //assert.deepEqual(_res, item.result)
            console.log(_res)
        }) 
    }
})
