const express = require('express');
const config = require('../config/config');
const mail = require('../service/sXHMail');

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











// 导出用户路由
module.exports = rUser;