//导入
const M_user = require('../models/m_user');
//渲染登录页面
exports.showSignin = (req, res) => {
  res.render('signin.html');
}
//验证登录
exports.handleSignin = (req, res, next) => {
  //获取请求数据
  const body = req.body;
  M_user.checkEmail(body.email, (err, data) => {
    if (err) {
      return next(err);
    }
    //判断邮箱是否存在
    if (data.length === 0) {
      return res.send({
        code: 1,
        msg: '邮箱不存在'
      });
    }
    //进一步判断密码是否正确
    if (data[0].password !== body.password) {
      return res.send({
        code: 2,
        msg: '密码不正确'
      });
    }

    req.session.user = data[0];
    res.send({
      code: 200,
      msg: '登录成功'
    });
  });
}
//退出登录
exports.handleSignout = (req, res) => {
  //清除session
  delete req.session.user;
  //重定向到登录界面
  res.redirect('/signin');
}

//渲染注册页面
exports.showSignup = (req, res) => {
  res.render('signup.html');
};

//处理注册请求
exports.handleSignup = (req, res, next) => {
  //获取请求数据
  const body = req.body;
  //查询数据库
  M_user.checkEmail(body.email, (err, data) => {
    if (err) {
      return next(err);
    }
    //邮箱存在
    if (data[0]) {
      return res.send({
        code: 1,
        msg: '邮箱已被注册'
      });
    }
    M_user.checkNickName(body.nickname, (err, data) => {
      if (err) {
        return next(err);
      }
      //昵称存在
      if (data[0]) {
        return res.send({
          code: 2,
          msg: '昵称已存在'
        });
      }
      //可以注册
      M_user.addUser(body, (err, data) => {
        if (err) {
          return next(err);
        }
        res.send({
          code: 200,
          msg: '注册成功'
        });
      });
    });
  });
}