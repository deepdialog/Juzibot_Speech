import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('biaoqian_test.js 👋',() => {
    
////////////////////
// 标签检测
///////////////////

    const args_6 = {
        text: () => {
            return '标签 可怕'
        }
    }
    let payload_6 = {
        roomTopic: null,
        isRoom: false,
        text: args_6.text()
    }
    var _expected_value_6 = {
        roomTopic: null,
        isRoom: false,
        text: '标签 可怕',
        intent: 'retag',
        newTag: ' 可怕'
      }
    it('🏷️标签测试', async () => {   
        const _res_6 = await textIntentDetect(args_6,payload_6); 
        assert.deepEqual(_res_6,_expected_value_6);
    });
});


    