const express = require('express');

let rServe = express();
let name = "rServe";



// 细胞保藏服务页面
rServe.get('/preservation', (req, res) => { res.render('../view/serve/preservation.html'); });



// 细胞定制服务页面
rServe.get('/customized', (req, res) => { res.render('../view/serve/customized.html'); });



// 细胞鉴定服务页面
rServe.get('/appraisal', (req, res) => { res.render('../view/serve/appraisal.html'); });












// 导出路由模块
module.exports = rServe;