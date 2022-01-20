
// hello_test.js

// const assert = require('assert');

// const sum = require('../hello');

import assert from 'assert'
import { intentDetect } from '../src/intent-detect.js'  // 待测试
import { textIntentDetect } from '../src/intent-detect.js' //测试
import { bot } from '../src/bot.js'
import { url } from 'inspector'
import fs from 'fs'
// import { onMessage } from '../src/index.js'


try {
    // let r = await hello();
    // assert.strictEqual(r, 15);
    console.log("😊")
    //done();
} catch (err) {
    done(err);
}

// bot
// .on('message', onMessage)

// var msg = onMessage;


const promisic = function (func) {
    return function (params = {}) {
      return new Promise((resolve, reject) => {
        const args = Object.assign(params, {
          success: (res) => {
            resolve(res);
          },
          fail: (error) => {
            reject(error);
          }
        });
        func(args);
      });
    };
  };
////////////////////
// 去掉可能的 @xxx _1
///////////////////
const args_1 = {
  text: () => {
      //console.log('12222')
      return '123 @abc https://me.w0x7ce.eu'
  }
}

let payload_1 = {
  roomTopic: null,
  isRoom: false,
  text: args_1.text()
}

//console.log(textIntentDetect(args_1,payload_1))

var _expected_value_1 = {
  // text: () => {
  //     console.log('12222')
  //     return 'https://me.w0x7ce.eu'
  // },
  roomTopic: null,
  isRoom: false,
  text: '123 @abc https://me.w0x7ce.eu',
  intent: 'url',
  url: 'https://me.w0x7ce.eu'
}

// const gg = await textIntentDetect(args_1,payload_1);
// console.log(gg);


////////////////
// 网址识别功能 _2
///////////////
const args_2 = {
  text: () => {
      //console.log('12222')
      return 'https://me.w0x7ce.eu'
  }
}

let payload_2 = {
    roomTopic: null,
    isRoom: false,
    text: args_2.text()
}

var _expected_value_2 = {
    // text: () => {
    //     console.log('12222')
    //     return 'https://me.w0x7ce.eu'
    // },
    roomTopic: null,
    isRoom: false,
    text: args_2.text(),
    intent: 'url',
    url: 'https://me.w0x7ce.eu'
}

////////////////
// 小橘子等关键词识别检测 _3
///////////////
// const args_3 = {
//   text: () => {
//       return '小橘子'
//   }
// }

// let payload_3 = {
//   roomTopic: null,
//   isRoom: false,
//   text: args_3.text()
// }

// var gg_data;
// let rawdata = fs.readFile('test/xiaojuzi_test_result.txt','utf-8',function(err,data){
//   if (err){
//     console.log(err);
//   }
//   else{
//     //console.log(data);
//     //gg_data=data;
//   }
// }
// );
// var _expected_value_3 = {
//   gg_data,
//   intent: 'todo',
//   isRoom: false,
//   roomTopic: null,
//   text: '子'
// }

// // const gg = await textIntentDetect(args_3,payload_3);
// // console.log(gg);
//console.log(_expected_value_3);


// var _expected_value_3 = {
//   // text: () => {
//   //     console.log('12222')
//   //     return 'https://me.w0x7ce.eu'
//   // },
//   roomTopic: null,
//   isRoom: false,
//   text: args_3.text(),
//   intent: 'url',
//   url: 'https://me.w0x7ce.eu'
// }


///////////////
// 更新重启&&成熟的机器人 _4
///////////////
const args_4 = {
  text: () => {
      return '更新重启'
  }
}

let payload_4 = {
  roomTopic: null,
  isRoom: false,
  text: args_4.text()
}

var _expected_value_4 = {
  
  intent: null,
  isRoom: false,
  roomTopic: null,
  text: args_4.text()
}

// const gg = await textIntentDetect(args_4,payload_4);
// console.log(gg);


///////////////
// 标签 _5
///////////////
const args_5 = {
  text: () => {
      return '标签'
  }
}

let payload_5 = {
  roomTopic: null,
  isRoom: false,
  text: args_5.text()
}

// var gg_data;
// let rawdata = fs.readFile('test/biaoqian.txt','utf-8',function(err,data){
//   if (err){
//     console.log(err);
//   }
//   else{
//     //console.log(data);
//     //gg_data=data;
//   }
// }
// );

// var _expected_value_5 = gg_data;
// console.log(_expected_value_5);
// const gg = await textIntentDetect(args_5,payload_5);
// console.log(JSON.stringify(gg) === '');

// 转换成promise 
function promiseWrapper(args) {
    return new Promise((reslove) => {
        reslove(args);
    })
}

describe('src/intent-detect.js', () => {

    describe(' Juzibot v1.0 测试 🔥', () => {
      describe(' 文本意图识别部分 👋',() => {

        it('去掉可能的@', async () => {
          const _res_1 = await textIntentDetect(args_1,payload_1); // 此处需要利用 await 等到promise 的返回值 才能进行有效比较  promise比较无意义 因为不确定是否返回值
          assert.deepEqual(_res_1, _expected_value_1);
        });
        



        ////////
        ////////  网址识别单测

        it('网址识别是否正确', async () => {
            const _res_2 = await textIntentDetect(args_2,payload_2); // 此处需要利用 await 等到promise 的返回值 才能进行有效比较  promise比较无意义 因为不确定是否返回值
            assert.deepEqual(_res_2, _expected_value_2);
        });

        ///////
        /////// 小橘子等关键词识别检测 _3 // 未解决

        // it('小橘子等关键词识别检测', async () => {
        //   const _res_3 = await textIntentDetect(args_3,payload_3); // 此处需要利用 await 等到promise 的返回值 才能进行有效比较  promise比较无意义 因为不确定是否返回值
        //   assert.deepEqual(_res_3, _expected_value_3);
        // });

        ///////
        /////// 更新重启&&成熟机器人 _4 // 未解决 和 _3 同样问题

        // it('更新重启&&成熟机器人', async () => {
        //   const _res_4 = await textIntentDetect(args_4,payload_4); // 此处需要利用 await 等到promise 的返回值 才能进行有效比较  promise比较无意义 因为不确定是否返回值
        //   assert.deepEqual(_res_4, _expected_value_4);
        // });

        ///////
        /////// 标签 _5 // 未解决 和 _3 同样问题

        // it('标签', async () => {
        //   //const _res_5 = await textIntentDetect(args_5,payload_5); // 此处需要利用 await 等到promise 的返回值 才能进行有效比较  promise比较无意义 因为不确定是否返回值
        //   //assert.deepEqual(_res_5, _expected_value_5);
        //   assert.equal(1,1);
        // });


        // /home/tianrking/.cache/typescript/4.5/node_modules/@types/node/assert.d.ts
        // 寻找 assert的方法 


        //可以打印出值进行对比 从而得到期望输出
        //console.log(typeof(_expected_value));
        //console.log(textIntentDetect(args,payload));

        // it('sum(1, 2) should return 3', () => {
        //     assert.strictEqual(sum(1, 2), 3);
        // });

        // it('sum(1, 2, 3) should return 6', () => {
        //     assert.strictEqual(sum(1, 2, 3), 6);
        // });
    });
  });      
});