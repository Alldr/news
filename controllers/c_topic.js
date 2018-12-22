//导包
const M_topic = require('../models/m_topic');
const moment = require('moment');

//渲染文章列表页
exports.showTopic = (req, res, next) => {
  //获取文章列表
  M_topic.findAllTopics((err, data) => {
    if (err) {
      return next(err);
    }
    res.render('index.html', {
      topics: data,
    });
  });
}

//跳转到发表文章页面
exports.creatTopic = (req, res) => {
 res.render('topic/create.html');
}

//添加文章
exports.handleCreatTopic = (req, res, next) => {
  //获取请求数据
  var body = req.body;
  // 增加添加时间
  body.createdAT = moment().format();
  //增加用户id
  body.userId = sessionUser.id;
  //让M将数据添加到数据库并返回结果
  M_topic.addTopic(body, (err, data) => {
    if (err) {
      return next(err);
    }
    res.send({
      code: 200,
      msg: '发表成功'
    });
  });
}
//渲染详情页面
exports.showTopicDetail = (req, res, next) => {
  //获取文章Id
  const topicId = req.params.topicId;
  //让M查询数据库并返回结果
  M_topic.findTopicById(topicId, (err, data) => {
    if (err) {
      return next(err);
    }
    // console.log(data[0]);
    res.render('topic/show.html', {
      topic: data[0],
    });

  });
}

//删除文章
exports.handleDeletTopic = (req, res, next) => {
  //获取文章id
  const topicId = req.params.topicId;
  //让M删除数据库数据并返回结果
  M_topic.handleDeletTopic(topicId, (err, data) => {
    if (err) {
      return next(err);
    }
    //重定向
    res.redirect('/');
  });
}

//渲染文章编辑页面
exports.showEditTopic = (req, res, next) => {
  //获取文章id
  const topicId = req.params.topicId;
  //让M查询数据库并返回结果
  M_topic.findTopicById(topicId, (err, data) => {
    if (err) {
      return next(err);
    }
    res.render('topic/edit.html', {
      topic: data[0]
    });
  });
}

//编辑文章页面
exports.handleEditTopic = (req, res, next) => {
  //获取文章id
  const topicId = req.params.topicId;
  //获取请求数据
  const body = req.body;
  //让M修改数据库并返回结果
  M_topic.handleEditTopic(body, topicId, (err, data) => {
    if (err) {
      return next(err);
    }
    res.send({
      code: 200,
      msg: '编辑成功'
    });
  });
}