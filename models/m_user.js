//导包
const connection = require('../config/db_config');
//验证登录
exports.checkEmail = (email, callback) => {
  const sql = 'select * from `users` where email= ?';
  connection.query(sql, email, (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
}

//验证昵称
exports.checkNickName = (nickname, callback) => {
  const sql = 'select * from `users` where nickname= ?';
  connection.query(sql, nickname, (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
}

//添加新用户
exports.addUser = (body, callback) => {
  const sql = 'insert into `users` set ?';
  connection.query(sql, body, (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
}