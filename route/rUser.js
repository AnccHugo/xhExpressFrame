const express = require('express');
const config = require('../config/config');
const mail = require('../service/sXHMail');
const userController = require('../controller/userController');

let rUser = express();



rUser.get('/liuyan', (req, res) => { res.render('../view/user/liuyan.html'); });

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