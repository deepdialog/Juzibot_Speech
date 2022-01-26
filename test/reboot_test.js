import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('reboot_test.js 👋',() => {
// /////////////
// 更新重启&&成熟的机器人 _4
// /////////////
    var test_msg = new Array();
    var test_payload = new Array();
    var test_result = new Array();
    var i = 1;

    test_msg[i] = {
        text: () => {
            return '成熟的机器人'
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
        text: "成熟的机器人",
        intent: 'todo'
    }

    i++;
    test_msg[i] = {
        text: () => {
            return '更新重启'
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
        text: "更新重启",
        intent: 'todo'
    }
    i++;
    test_msg[i] = {
        text: () => {
            return '更新重启 123'
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
        text: "更新重启 123",
        intent: 'todo'
    }

    i++;
    test_msg[i] = {
        text: () => {
            return '更新重启 @123 /123'
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
        text: "更新重启 @123 /123",
        intent: 'todo'
    }

    for(let i=1;i<=3;i++){
        (function(i) {
            it(String(i), async () => {
                var _res = await textIntentDetect(test_msg[i],test_payload[i]); 
                assert.deepEqual(_res,test_result[i]);
            }) 
        })(i);
    }
})
