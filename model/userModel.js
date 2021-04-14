const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const BaseModel = require('./baseModel');
const mail = require('../service/sXHMail');

const __USER_TABLE_PATH__ = path.join(config.dataPath, 'userTable.json');

class UserModel extends BaseModel {
  constructor(props) {
    super(props);

    function init() {
      if (!fs.existsSync(config.dataPath)) {
        fs.mkdirSync(config.dataPath, { recursive: true });
      }

      if (!fs.existsSync(__USER_TABLE_PATH__)) {
        fs.writeFileSync(__USER_TABLE_PATH__, JSON.stringify({ users: [] }));
      }
    }

    init();
  }

  login = async ({ email, password }) => {
    if (!email || !password) {
      return this.errorReturn('PARAMS_LACK');
    }

    let userTable = fs.readFileSync(__USER_TABLE_PATH__, { encoding: 'utf-8' });
    userTable = JSON.parse(userTable).users;
    if (!userTable) {
      return this.errorReturn('USER_TABLE_READ_FAIL');
    }

    const user = await userTable.find((value, index, ele) => {
      return value.email === email ? value : false;
    });

    if (!user) {
      return this.errorReturn('USER_NOT_FIND');
    }

    if (user.password && user.password === password) {
      userTable.shift(user);
      user.logintime = Date.now();
      userTable.push(user);
      fs.writeFileSync(__USER_TABLE_PATH__, JSON.stringify({ users: userTable }));

      delete user.password;
      return this.successReturn('', { user });
    }

    return this.errorReturn('USER_PASSOWRD_ERROR');
  };

  registe = async ({ email, password, verifyCode }) => {
    if (!email || !password || !verifyCode) {
      return this.errorReturn(res, 'PARAMS_LACK');
    }

    let userTable = fs.readFileSync(__USER_TABLE_PATH__, { encoding: 'utf-8' });
    userTable = JSON.parse(userTable).users;
    if (!userTable) {
      return this.errorReturn('USER_TABLE_READ_FAIL');
    }

    let user = await userTable.find((value, index, ele) => {
      return value.email === email ? value : false;
    });

    if (!user) {
      return this.errorReturn('USER_NOT_FIND');
    }

    if (user.isVerify) {
      return this.successReturn('');
    }

    if (!user.verifyCode) {
      return this.errorReturn('USER_VERIFY_CODE_NOT_FIND');
    }

    if (user.verifyCode != verifyCode) {
      return this.errorReturn('USER_VERIFY_FAIL');
    }

    userTable.shift(user);
    user.isVerify = true;
    user.password = password;
    user.registetime = Date.now();
    userTable.push(user);
    fs.writeFileSync(__USER_TABLE_PATH__, JSON.stringify({ users: userTable }));

    return this.successReturn();
  };

  sendVerifyCode = async ({ email }) => {
    if (!email) {
      return this.errorReturn('PARAMS_LACK');
    }

    let userTable = fs.readFileSync(__USER_TABLE_PATH__, { encoding: 'utf-8' });
    userTable = JSON.parse(userTable).users;
    if (!userTable) {
      return this.errorReturn('USER_TABLE_READ_FAIL');
    }

    let user = await userTable.find((value, index, ele) => {
      return value.email === email ? value : false;
    });

    user = user || {};
    userTable.shift({ email });

    user.email = email;
    user.createtime = Date.now();
    user.verifyCode = '';
    for (let i = 0; i < 6; i++) {
      user.verifyCode += Math.floor(Math.random() * 10);
    }

    userTable.push(user);
    fs.writeFileSync(__USER_TABLE_PATH__, JSON.stringify({ users: userTable }));

    const sendResult = await mail.send(config.mailFrom, email, '账号注册', '请查收验证码：（' + user.verifyCode + '）');
    if (!sendResult) {
      return this.errorReturn('USER_VERIFY_CODE_SEND_FAIL');
    }

    return this.successReturn('');
  };

  sendLiuyan = async ({ fullname, phone, email, company, city, message }) => {
    if (!fullname || !phone || !email || !company || !city || !message) {
      return this.errorReturn('PARAMS_LACK');
    }

    if (config.meisenEmailPool) {
      await config.meisenEmailPool.map(value => {
        if (value && value.email) {
          let subject = "";
          subject += "用户留言 - 姓名：" + fullname;
          subject += " - 公司：" + company;
          subject += " - 城市" + city;

          let content = "";
          content += "姓名：" + fullname + "\r\n";
          content += "手机号：" + phone + "\r\n";
          content += "邮箱：" + email + "\r\n";
          content += "公司：" + company + "\r\n";
          content += "城市：" + city + "\r\n";
          content += "留言内容：" + message + "\r\n";

          mail.send(config.mailFrom, value.email, subject, content);
        }
      });

      return this.successReturn('USER_LIUYAN_SUCCESS');
    }

    return this.errorReturn('');
  };

}

const userModel = new UserModel();

module.exports = userModel;