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

    test_msg[i] = {
        text: () => {
            return '小橘'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        roomTopic: null,
        isRoom: false,
        text: '',
        "intent": "todo"
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
    }); 

    i++;
    test_msg[i] = {
        text: () => {
            return '小橘子'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        roomTopic: null,
        isRoom: false,
        text: '',
        "intent": "todo"
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
    }); 

    i++;
    test_msg[i] = {
        text: () => {
            return '小橘子'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        roomTopic: null,
        isRoom: false,
        text: '',
        "intent": "todo"
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
    }); 

    i++;
    test_msg[i] = {
        text: () => {
            return '橘子'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        roomTopic: null,
        isRoom: false,
        text: '',
        "intent": "todo"
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
    }); 
    i++;
    test_msg[i] = {
        text: () => {
            return '桔子'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        roomTopic: null,
        isRoom: false,
        text: '',
        "intent": "todo"
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
    }); 
    i++;
    test_msg[i] = {
        text: () => {
            return '桔子'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        roomTopic: null,
        isRoom: false,
        text: '',
        "intent": "todo"
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
    }); 
    i++;
    test_msg[i] = {
        text: () => {
            return '小桔子'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        roomTopic: null,
        isRoom: false,
        text: '',
        "intent": "todo"
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
    }); 

    i++;
    test_msg[i] = {
        text: () => {
            return '小橘 123'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        roomTopic: null,
        isRoom: false,
        text: ' 123',
        "intent": "todo"
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
    }); 

    i++;
    test_msg[i] = {
        text: () => {
            return '/ 321'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        roomTopic: null,
        isRoom: false,
        text: ' 321',
        "intent": "todo"
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
    }); 

    i++;
    test_msg[i] = {
        text: () => {
            return '\ ads'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        roomTopic: null,
        isRoom: false,
        text: ' ads',
        "intent": "todo"
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
    }); 

    i++;
    test_msg[i] = {
        text: () => {
            return '# tset'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        roomTopic: null,
        isRoom: false,
        text: ' tset',
        "intent": "todo"
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
    }); 


    i++;
    test_msg[i] = {
        text: () => {
            return '/ \\'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        roomTopic: null,
        isRoom: false,
        text: ' \\',
        "intent": "todo"
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
    }); 

    i++;
    test_msg[i] = {
        text: () => {
            return '/ #'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        roomTopic: null,
        isRoom: false,
        text: ' #',
        "intent": "todo"
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
    }); 

    i++;
    test_msg[i] = {
        text: () => {
            return '/#'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        roomTopic: null,
        isRoom: false,
        text: '#',
        "intent": "todo"
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
    }); 

    i++;
    test_msg[i] = {
        text: () => {
            return '##/'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        roomTopic: null,
        isRoom: false,
        text: '#/',
        "intent": "todo"
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
    }); 

});

    