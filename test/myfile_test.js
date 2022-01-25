import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import Mocha from 'mocha'
var describe = Mocha.describe
var it = Mocha.it

describe('myfile_test.js 👋',() => {
    
////////////////////
// 我的文件 功能检测
///////////////////

    const args_8 = {
        text: () => {
            return '我的文件'
        }
    }
    let payload_8 = {
        roomTopic: null,
        isRoom: false,
        text: args_8.text()
    }
    var _expected_value_8 = { roomTopic: null, isRoom: false, text: '我的文件', intent: 'list-file' }
    
    it('💰我的文件', async () => {
        
        const _res_8 = await textIntentDetect(args_8,payload_8); 
        //console.log(_res_8);
        assert.deepEqual(_res_8,_expected_value_8);
    });
});
    