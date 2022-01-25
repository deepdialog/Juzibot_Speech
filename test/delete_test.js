import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('delete_test.js 👋',() => {
    
////////////////////
// 标签检测
///////////////////

    const args_7 = {
        text: () => {
            return '删除文件 txt.jpg'
        }
    }
    let payload_7 = {
        roomTopic: null,
        isRoom: false,
        text: args_7.text()
    }
    var _expected_value_7 = {
        roomTopic: null,
        isRoom: false,
        text: '删除文件 txt.jpg',
        intent: 'todo'
      }
    it('🚮删除文件', async () => {
        
        const _res_7 = await textIntentDetect(args_7,payload_7); 
        //console.log(_res_7);
        assert.deepEqual(_res_7,_expected_value_7);
    });
});


    