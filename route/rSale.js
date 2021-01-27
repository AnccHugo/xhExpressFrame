const express = require('express');

let rSale = express();
let name = "rSale";



// 促销活动页面
rSale.get('/activity', (req, res) => { res.render('../view/sale/activity.html'); });











// 导出路由模块
module.exports = rSale;