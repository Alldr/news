//入口文件
//导包
const express = require('express');
//路由
const router = require('./router');
//模板引擎
const bodyParser = require('body-parser');
//express-session
const session = require('express-session')
//express-mysql-session
const MySQLStore = require('express-mysql-session')(session);
//请求日志
var morgan = require('morgan');
const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'news'
};
const sessionStore = new MySQLStore(options);
//实例化express
const app = express();

//配置
//统一处理所有静态资源(第三方包)
app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));
//配置模板引擎
app.engine('html', require('express-art-template'));
//body-parser的配置项
app.use(bodyParser.urlencoded({
  extended: false
}));
//配置express-session
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }))
//配置express-MySQL-session

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

//请求日志
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

//将session存在app对象中的公共成员locals属性中,值是一个对象
app.use((req, res, next) => {
  app.locals.sessionUser = req.session.user;
  // console.log(app.locals);
  next();
});
//挂载路由
app.use(router);

//渲染404页面 
app.use((req, res, next) => {
  res.render('404.html');
});
//同一处理错误信息
app.use((err, req, res, next) => {
  res.send({
    code: 500,
    msg: err.message
  });
});
//监听端口
app.listen(8000, () => {
  console.log('run it ----');
});