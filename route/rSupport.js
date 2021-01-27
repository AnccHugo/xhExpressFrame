const express = require('express');

let rSupport = express();
let name = "rSupport";



// 细胞鉴定服务页面
rSupport.get('/reference', (req, res) => { res.render('../view/support/reference.html'); });



// 常见问题页面
rSupport.get('/question', (req, res) => { res.render('../view/support/question.html'); });









// 导出路由模块
module.exports = rSupport;