// import assert from 'assert'
// import { textIntentDetect } from '../src/intent-detect.js' //测试
// import Mocha from 'mocha'
// var describe = Mocha.describe
// var it = Mocha.it  


// describe('url_name_test.js 👋',() => {
    
//     const tests = [];
//     let item;
//     item = {
//         msg : {
//             text: () => {
//                 return '橘子今天七点要干饭'
//                 }
//             },
//         payload : {
//             isRoom: false,
//             text: null,
//         },
//         result : {
//             intent: "todo",
//             isRoom: false,
//             text: null ,  
//         }
//     }

//     item.payload.text = item.msg.text();
//     item.result.text = "今天七点要干饭";
//     tests.push(item)

//     item = {
//         msg : {
//             text: () => {
//                 return '小橘子我七点要干饭'
//                 }
//             },
//         payload : {
//             isRoom: false,
//             text: null,
//         },
//         result : {
//             intent: "todo",
//             isRoom: false,
//             text: null ,  
//         }
//     }

//     item.payload.text = item.msg.text();
//     item.result.text = "我七点要干饭"; //need fix
//     tests.push(item)

//     item = {
//         msg : {
//             text: () => {
//                 return '小桔今天7点要干饭'
//                 }
//             },
//         payload : {
//             isRoom: false,
//             text: null,
//         },
//         result : {
//             intent: "todo",
//             isRoom: false,
//             text: null ,  
//         }
//     }

//     item.payload.text = item.msg.text();
//     item.result.text = "今天7点要干饭";
//     tests.push(item)


//     for (const item of tests) {
//         it(item.msg.text(), async () => {
//             const _res = await textIntentDetect(item.msg, item.payload)
//             assert.deepEqual(_res, item.result)
//         }) 
//     }
// });
