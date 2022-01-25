import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('url_name_test.js 👋',() => {
        
    var test_msg = new Array();
    var test_payload = new Array();
    var test_result = new Array();
    var i = 1;

    test_msg[i] = {
        text: () => {
            return '123 @abc https://me.w0x7ce.eu'
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
        text: '123 @abc https://me.w0x7ce.eu',
        intent: 'url',
        url: 'https://me.w0x7ce.eu'
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
        
    });  

    i++;
    test_msg[i] = {
        text: () => {
            return '123 https://me.w0x7ce.eu @abc'
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
        text: '123 @abc https://me.w0x7ce.eu',
        intent: 'url',
        url: 'https://me.w0x7ce.eu'
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
        
    }); 
    i++;
    test_msg[i] = {
        text: () => {
            return '@13213 https://me.w0x7ce.eu 123'
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
        text: '@13213 https://me.w0x7ce.eu 123',
        intent: 'url',
        url: 'https://me.w0x7ce.eu'
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
        
    }); 
    i++;
    test_msg[i] = {
        text: () => {
            return ' @abcd 123 https://me.w0x7ce.eu/'
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
        text: ' @abcd 123 https://me.w0x7ce.eu/',
        intent: 'url',
        url: 'https://me.w0x7ce.eu/'
    }
    
    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
    }); 
    //i++;
});

    