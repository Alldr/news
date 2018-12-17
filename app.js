//入口文件
//导包
const express = require('express');
//路由
const router = require('./router');


//实例化express
const app = express();

//配置
//统一处理所有静态资源(第三方包)
app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));

//挂载路由
app.use(router);




//监听端口
app.listen(8080, () => {
  console.log('run it ----');
});