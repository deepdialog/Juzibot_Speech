import assert from 'assert'
import { textVector } from '../../src/components/text-to-vector/index.js' //ζ΅θ―
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('reboot_test.js π',() => {
// /////////////
// ζ΄ζ°ιε―&&ζηηζΊε¨δΊΊ _4
// /////////////
    const tests = [];
    let item;
    item = {
        msg : {
            text: () => {
                return 'ζηηζΊε¨δΊΊ'
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
