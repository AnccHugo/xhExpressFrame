const express = require('express');
const productController = require('../controller/productController');

let rProduct = express();
let name = "rProduct";



// 细胞产品页
rProduct.get('/libary', (req, res) => { res.render('../view/product/libary.html'); });
rProduct.get('/detail', (req, res) => { res.render('../view/product/detail.html'); });



// 细胞产品服务
rProduct.post('/getCells', productController.GetCells);

rProduct.post('/getCell', productController.GetCell);







// 导出路由模块
module.exports = rProduct;