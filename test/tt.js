import fs from "fs"
var gg_data;
let rawdata = fs.readFile('/home/tianrking/xiaojuzi/test/biaoqian.txt','utf-8',function(err,data){
    if (err){
      console.log(err);
    }
    else{
      console.log(data);
      gg_data=data;
    }
  }
  );
  
//   var _expected_value_5 = gg_data;
//   console.log(rawdata);