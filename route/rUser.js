const express = require('express');
const config = require('../config/config');
const mail = require('../service/sXHMail');
const userController = require('../controller/userController');

let rUser = express();



rUser.get('/liuyan', (req, res) => { res.render('../view/user/liuyan.html'); });

rUser.get('/login', async(req, res) => {
    let params = req.query;
    params.from = params.from || config.mailFrom;

    console.log('---> 开始发送邮件');
    let result = await mail.send(params.from, params.to, params.subject, params.text);

    console.log(result);
    console.log('<--- 发送邮件完毕邮件');

    res.send(true);
});

/** 
 * @param {string} email
 * @param {string} password
 */
rUser.post('/login', userController.login);

/** 
 * @param {string} email
 * @param {string} password
 */
rUser.post('/registe', userController.registe);

/** 
 * @param {string} email
 */
rUser.post('/sendVerifyCode', userController.sendVerifyCode);






// 导出用户路由
module.exports = rUser;