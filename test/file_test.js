import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import mocha from 'mocha'
var describe = mocha.describe
var it = mocha.it

describe('myfile_test.js 👋',() => {
    
////////////////////
// 文件 功能检测  
///////////////////

    var test_msg = new Array();
    var test_payload = new Array();
    var test_result = new Array();
    var i = 1;

    test_msg[i] = {
        text: () => {
            return '文件 1 搜索群文件 '
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
        text: "文件 1 搜索群文件 "       
    }
    i++;
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
    i++;
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
    for(let i=1;i<=3;i++){
        (function(i) {
            it(String(i), async () => {
                var _res = await textIntentDetect(test_msg[i],test_payload[i]); 
                assert.deepEqual(_res,test_result[i]);
            }) 
        })(i);
    }
});

    