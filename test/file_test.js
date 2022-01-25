import assert from 'assert'
import { textIntentDetect } from '../src/intent-detect.js' //测试
import mocha from 'mocha'
var describe = mocha.describe
var it = mocha.it

describe('myfile_test.js 👋',() => {
    
////////////////////
// 文件 功能检测  
///////////////////

    const args_9 = {
        text: () => {
            return '文件'
        }
    }
    
    let payload_9 = {
        roomTopic: null,
        isRoom: false,
        text: args_9.text()
    }
    var _expected_value_9 = { roomTopic: null, isRoom: false, text: '文件', intent: 'todo' }

    it('文件命令', async () => {
        
        const _res_9 = await textIntentDetect(args_9,payload_9); 
        //console.log(_res_9);
        assert.deepEqual(_res_9,_expected_value_9);
    });
});

    