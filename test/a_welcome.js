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
    console.log("      😊")
    console.log(' Juzibot v1.0 测试 🔥');
    console.log(' 纯文本 意图测试src/intent-detect.js')
    //done();
} catch (err) {
    done(err);
}

//promise 转换 无意义 但具有参考价值
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