//导包
const express = require('express');
//用户登录包
const c_user = require('./controllers/c_user');
//文章列表包
const c_topic = require('./controllers/c_topic');
//实例化路由
const router = express.Router();
//监听请求， 实现函数

router.get('/signin', c_user.showSignin)
      .post('/signin', c_user.handleSignin)
      .get('/signout', c_user.handleSignout)
      .get('/signup', c_user.showSignup)
      .post('/signup', c_user.handleSignup)
      .get('/', c_topic.showTopic)
      .get('/topic/create', c_topic.creatTopic)
      .post('/topic/create', c_topic.handleCreatTopic)
      .get('/detail/topic/:topicId', c_topic.showTopicDetail)
      .get('/topic/:topicId/delete', c_topic.handleDeletTopic)
      .get('/topic/:topicId/edit', c_topic.showEditTopic)
      .post('/topic/:topicId/edit', c_topic.handleEditTopic);;
      
//导出路由
module.exports = router;
