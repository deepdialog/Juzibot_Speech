import assert from 'assert'
import { textIntentDetect } from '../../src/intent-detect.js' //ζ΅θ―
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('myfile_test.js π',() => {
    
////////////////////
// ζηζδ»Ά εθ½ζ£ζ΅
///////////////////
   
    const tests = [];
    let item;

    item = {
        msg : {
            text: () => {
                return 'ζηζδ»Ά'
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
                return 'εεΊζδ»Ά'
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
                return 'ηΎ€ζδ»Ά'
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
                return 'ζηζδ»Ά 123'
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
    item.result.text = item.msg.text(); //δΈε€ͺεη
    tests.push(item)

    tests.push(item)
    item = {
        msg : {
            text: () => {
                return 'ζηζδ»Άa '
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
    item.result.text = item.msg.text(); //δΈε€ͺεη
    tests.push(item)

    for (const item of tests) {
        it(item.msg.text(), async () => {
            const _res = await textIntentDetect(item.msg, item.payload)
            assert.deepEqual(_res, item.result)
        }) 
    }

});
