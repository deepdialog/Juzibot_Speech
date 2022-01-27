import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('keyword_jz.js 👋',() => {
    
////////////////////
// 小橘子 橘子 关键字检测
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
                return '小橘'
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
    item.result.text = "";
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '小橘子'
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
    item.result.text = "子" // 不太对
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '小橘'
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
    item.result.text = "";
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '桔子'
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
    item.result.text = "";
    tests.push(item) 

    item = {
        msg : {
            text: () => {
                return '小桔子'
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
    item.result.text = "";
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '小桔 123'
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
    item.result.text = item.msg.text();
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '/ 123'
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
    item.result.text = " 123"
    tests.push(item)
    
    item = {
        msg : {
            text: () => {
                return '\\ ds'
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
    item.result.text = " ds"
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '# gg'
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
    item.result.text = " gg"
    tests.push(item)

    item = {
        msg : {
            text: () => {
                return '/ \\'
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
    item.result.text = " \\"
    tests.push(item)
   
    item = {
        msg : {
            text: () => {
                return '# \#'
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
    item.result.text = " \#"
    tests.push(item)
    
    item = {
        msg : {
            text: () => {
                return '\##'
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
    item.result.text = "#"
    tests.push(item)
    
    for (const item of tests) {
        it(item.msg.text(), async () => {
            const _res = await textIntentDetect(item.msg, item.payload)
            assert.deepEqual(_res, item.result)
        }) 
    }
});