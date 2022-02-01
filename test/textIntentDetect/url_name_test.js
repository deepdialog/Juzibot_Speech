import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('url_name_test.js 👋',() => {
    
    const tests = [];
    let item;
    item = {
        msg : {
            text: () => {
                return '123 @abc https://me.w0x7ce.eu'
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "url",
            isRoom: false,
            text: null , 
            url: "https://me.w0x7ce.eu"     
        }
    }

    item.payload.text = item.msg.text();
    item.result.text = item.msg.text();
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '123 https://me.w0x7ce.eu'
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "url",
            isRoom: false,
            text: null , 
            url: "https://me.w0x7ce.eu"     
        }
    }

    item.payload.text = item.msg.text();
    item.result.text = item.msg.text();
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '@13213 https://me.w0x7ce.eu 123'
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "url",
            isRoom: false,
            text: null , 
            url: "https://me.w0x7ce.eu"     
        }
    }

    item.payload.text = item.msg.text();
    item.result.text = item.msg.text();
    tests.push(item)
    
    item = {
        msg : {
            text: () => {
                return '@13213 https://me.w0x7ce.eu //'
                }
            },
        payload : {
            isRoom: false,
            text: null,
        },
        result : {
            intent: "url",
            isRoom: false,
            text: null , 
            url: "https://me.w0x7ce.eu"     
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
});
