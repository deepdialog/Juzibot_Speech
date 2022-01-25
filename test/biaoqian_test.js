import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('biaoqian_test.js 👋',() => {
    
////////////////////
// 标签检测
///////////////////
    var test_msg = new Array();
    var test_payload = new Array();
    var test_result = new Array();
    var i = 1;
    
    test_msg[i] = {
        text: () => {
            return '标签'
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
        text: "标签",
        intent: 'todo'
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
        
    }); 

    i++;
    test_msg[i] = {
        text: () => {
            return '/标签'
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
        text: "标签",
        intent: 'todo'
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
        
    }); 

    i++;
    test_msg[i] = {
        text: () => {
            return '/标签 asd'
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
        text: "/标签 asd",
        newTag: " asd",
        intent: 'retag'
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
        
    }); 

});


    