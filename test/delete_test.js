import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('delete_test.js 👋',() => {
    
////////////////////
// 标签检测
///////////////////

    var test_msg = new Array();
    var test_payload = new Array();
    var test_result = new Array();
    var i = 1;

    test_msg[i] = {
        text: () => {
            return '删除文件 1 搜索群文件 '
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        intent: "get-search-file",
        roomTopic: null,
        isRoom: false,
        keywords: " ",
        number : 1,
        text: "删除文件 1 搜索群文件 "       
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
        
    }); 

    i++
    test_msg[i] = {
        text: () => {
            return '文件  2 搜索群文件 '
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        intent: "get-search-file",
        roomTopic: null,
        isRoom: false,
        keywords: " ",
        number : 2,
        text: "文件  2 搜索群文件 "       
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
        
    });

    i++
    test_msg[i] = {
        text: () => {
            return '文件  9 搜索文件 '
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        intent: "get-search-file",
        roomTopic: null,
        isRoom: false,
        keywords: " ",
        number : 9,
        text: "文件  9 搜索文件 "       
    }

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
        
    });
});


    