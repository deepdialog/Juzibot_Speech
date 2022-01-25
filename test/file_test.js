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
            return '文件 a 搜索群文件 '
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

    it(String(i), async () => {
        const _res = await textIntentDetect(test_msg[i],test_payload[i]); 
        assert.deepEqual(_res,test_result[i]);
        
    }); 
});

    