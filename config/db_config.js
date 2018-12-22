//导入MySQL包
const mysql = require('mysql');
// 2. 配置
const connection = mysql.createConnection({
  // 主机
  host: 'localhost',
  // 用户名
  user: 'root',
  // 密码
  password: 'root',
  // 数据库名字
  database: 'news'
});

// 3. 开启连接
connection.connect();

//导出
module.exports = connection;