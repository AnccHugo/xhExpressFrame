const express = require('express');

let rUser = express();



rUser.get('/liuyan', (req, res) => { res.render('../view/user/liuyan.html'); });











// 导出用户路由
module.exports = rUser;