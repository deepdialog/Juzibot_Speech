import assert from 'assert'
import { recognizeTodo } from '../../src/components/text-recognizers/index.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('test_recognizeTodo.js 👋',() => {
    
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
        recognizeTodo_result : "我明天12:00提醒你哦\n" //ffff
    }

    item.payload.text = item.msg.text()
    item.result.text = item.msg.text()
    item.intent.text = item.result.text
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '明天上午两点'
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
                return '明天2:00'
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
                return '明天下午一点'
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
        recognizeTodo_result : "我明天1:00提醒你哦\n" ///ffff
    }

    item = {
        msg : {
            text: () => {
                return '明天13：00'
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
        recognizeTodo_result : "我明天1:00提醒你哦\n" ///ffff
    }

    item.payload.text = item.msg.text()
    item.result.text = item.msg.text()
    item.intent.text = item.result.text
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '今天零点'
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
        recognizeTodo_result : "过去的时间无法提醒哦～\n"
    }

    item.payload.text = item.msg.text()
    item.result.text = item.msg.text()
    item.intent.text = item.result.text
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '每天 13:00'
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
        recognizeTodo_result : "我明天1:00提醒你哦\n" //ffff
    }

    item.payload.text = item.msg.text()
    item.result.text = item.msg.text()
    item.intent.text = item.result.text
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '每星期三'
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
        recognizeTodo_result : "我晚上九点提醒你哦\n" //ffff
    }

    item.payload.text = item.msg.text()
    item.result.text = item.msg.text()
    item.intent.text = item.result.text
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '每天16:00 abc'
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
        recognizeTodo_result : "我今天4:00提醒你哦\n" //ffff
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
