const express = require('express');

let rAbout = express();
let name = "rAbout";




// 人才招聘页面
rAbout.get('/job', (req, res) => { res.render('../view/about/job.html'); });



// 新闻动态页面
rAbout.get('/news', (req, res) => { res.render('../view/about/news.html'); });



// 联系我们页面
rAbout.get('/contact', (req, res) => { res.render('../view/about/contact.html'); });



// 公司简介页面
rAbout.get('/introduce', (req, res) => { res.render('../view/about/introduce.html'); });












// 导出路由模块
module.exports = rAbout;