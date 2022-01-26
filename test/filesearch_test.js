import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('filesearch_test.js 👋',() => {
    
////////////////////
// 搜索指令测试
///////////////////

    var test_msg = new Array();
    var test_payload = new Array();
    var test_result = new Array();
    var i = 1;

    test_msg[i] = {
        text: () => {
            return '搜索文件'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        intent: "search-file",
        roomTopic: null,
        isRoom: false,
        keywords: "文件",
        text: "搜索文件"       
    }
    i++;
    test_msg[i] = {
        text: () => {
            return '搜索群文件'
            }
        }
    test_payload[i] =  {
        roomTopic: null,
        isRoom: false,
        text: test_msg[i].text()
    }
    test_result[i] = {
        intent: "search-file",
        roomTopic: null,
        isRoom: false,
        keywords: "群文件",
        text: "搜索群文件"       
    }
    for(let i=1;i<=2;i++){
        (function(i) {
            it(String(i), async () => {
                var _res = await textIntentDetect(test_msg[i],test_payload[i]); 
                assert.deepEqual(_res,test_result[i]);
            }) 
        })(i);
    }
});

    