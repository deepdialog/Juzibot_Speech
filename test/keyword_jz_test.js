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

    test_msg[1] = {
        text: () => {
            return '小橘'
            }
        }
    test_payload[1] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[1].text()
    }
    test_result[1] = {
        roomTopic: null,
        isRoom: false,
        text: '',
        intent: "todo"
    }
    i++;
    test_msg[2] = {
        text: () => {
            return '小橘子'
            }
        }
    test_payload[2] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[2].text()
    }
    test_result[2] = {
        roomTopic: null,
        isRoom: false,
        text: '子',
        intent: "todo"
    }
    i++;
    test_msg[3] = {
        text: () => {
            return '小橘子'
            }
        }
    test_payload[3] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[3].text()
    }
    test_result[3] = {
        roomTopic: null,
        isRoom: false,
        text: '子',
        intent : "todo"
    }
    i++;
    test_msg[4] = {
        text: () => {
            return '橘子'
            }
        }
    test_payload[4] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[4].text()
    }
    test_result[4] = {
        roomTopic: null,
        isRoom: false,
        text: '',
        intent : "todo"
    }
    i++;
    test_msg[5] = {
        text: () => {
            return '桔子'
            }
        }
    test_payload[5] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[5].text()
    }
    test_result[5] = {
        roomTopic: null,
        isRoom: false,
        text: '',
        intent : "todo"
    }
    i++;
    test_msg[6] = {
        text: () => {
            return '桔子'
            }
        }
    test_payload[6] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[6] = {
        roomTopic: null,
        isRoom: false,
        text: '',
        intent : "todo"
    }
    i++;
    test_msg[7] = {
        text: () => {
            return '小桔子'
            }
        }
    test_payload[7] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[7].text()
    }
    test_result[7] = {
        roomTopic: null,
        isRoom: false,
        text: '',
        intent: "todo"
    }
    i++;
    test_msg[8] = {
        text: () => {
            return '小橘 123'
            }
        }
    test_payload[8] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[8].text()
    }
    test_result[8] = {
        roomTopic: null,
        isRoom: false,
        text: ' 123',
        intent : "todo"
    }
    i++;
    test_msg[9] = {
        text: () => {
            return '/ 321'
            }
        }
    test_payload[9] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[9].text()
    }
    test_result[9] = {
        roomTopic: null,
        isRoom: false,
        text: ' 321',
        intent : "todo"
    }
    i++;
    test_msg[10] = {
        text: () => {
            return '\\ ds'
            }
        }
    test_payload[10] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[10].text()
    }
    test_result[10] = {
        roomTopic: null,
        isRoom: false,
        text: ' ds',
        intent : "todo"
    }
    i++;
    test_msg[11] = {
        text: () => {
            return '# tset'
            }
        }
    test_payload[11] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[11].text()
    }
    test_result[11] = {
        roomTopic: null,
        isRoom: false,
        text: ' tset',
        intent : "todo"
    }
    i++;
    test_msg[12] = {
        text: () => {
            return '/ \\'
            }
        }
    test_payload[12] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[12].text()
    }
    test_result[12] = {
        roomTopic: null,
        isRoom: false,
        text : ' \\',
        intent : "todo"
    }
    i++;
    test_msg[13] = {
        text: () => {
            return '/ #'
            }
        }
    test_payload[13] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[13].text()
    }
    test_result[13] = {
        roomTopic: null,
        isRoom: false,
        text: ' #',
        intent: "todo"
    }
    i++;
    test_msg[14] = {
        text: () => {
            return '/#'
            }
        }
    test_payload[14] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[14].text()
    }
    test_result[14] = {
        roomTopic: null,
        isRoom: false,
        text: '#',
        intent : "todo"
    }
    i++;
    test_msg[15] = {
        text: () => {
            return '##/'
            }
        }
    test_payload[15] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[15].text()
    }
    test_result[15] = {
        roomTopic: null,
        isRoom: false,
        text: '#/',
        intent : "todo"
    }
    i++;
    for(let i=1;i<=15;i++){
        (function(i) {
            it(String(i), async () => {
                var _res = await textIntentDetect(test_msg[i],test_payload[i]); 
                assert.deepEqual(_res,test_result[i]);
            }) 
        })(i);
    }

});

    