import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('myfile_test.js 👋',() => {
    
////////////////////
// 我的文件 功能检测
///////////////////

    var test_msg = new Array();
    var test_payload = new Array();
    var test_result = new Array();
    var i = 1;
    
    test_msg[i] = {
        text: () => {
            return '我的文件'
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
        text: "我的文件",
        intent: 'list-file'
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
        
    }); 

    i++;
    test_msg[i] = {
        text: () => {
            return '列出文件'
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
        text: "列出文件",
        intent: 'list-file'
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
        
    }); 

    i++;
    test_msg[i] = {
        text: () => {
            return '群文件'
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
        text: "群文件",
        intent: 'list-file'
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
        
    }); 

    i++;
    test_msg[i] = {
        text: () => {
            return '我的文件 123'
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
        text: "我的文件 123",
        intent: 'todo'
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
        
    }); 

});
    