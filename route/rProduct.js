const express = require('express');
const productController = require('../controller/productController');

let rProduct = express();
let name = "rProduct";



// 细胞鉴定服务页面
rProduct.get('/libary', (req, res) => { res.render('../view/product/libary.html'); });

rProduct.post('/libary/getCells', productController.GetCells);







// 导出路由模块
module.exports = rProduct;