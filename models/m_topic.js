//导包
const connection = require('../config/db_config');
//查询数据库
exports.findAllTopics = (callback) => {
  const sql = 'select * from `topics` order by id desc';
  connection.query(sql, (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
}

//插入数据到数据库
exports.addTopic = (body, callback) => {
  const sql = 'insert into `topics` set ?';
  connection.query(sql, body, (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
}

//通过文章Id查询数据库
exports.findTopicById = (topicId, callback) => {
  const sql = 'select * from `topics` where id = ?';
  connection.query(sql, topicId, (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
}

//通过文章id删除文章数据
exports.handleDeletTopic = (topicId, callback) => {
  const sql = 'delete from `topics` where id = ?';
  connection.query(sql, topicId, (err,data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
}

//通过文章id修改文章数据
exports.handleEditTopic = (body, topicId, callback) => {
  const sql = 'update `topics` set ? where id = ?';
  connection.query(sql, [body, topicId], (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
}