const express = require('express');
const productController = require('../controller/productController');

let rProduct = express();
let name = "rProduct";



// 细胞产品页
rProduct.get('/libary', (req, res) => { res.render('../view/product/libary.html'); });
rProduct.get('/detail', (req, res) => { res.render('../view/product/detail.html'); });



// 细胞产品服务
rProduct.post('/getCells', productController.GetCells);
rProduct.post('/getNaiyaozhu', productController.GetNiayozhu);
rProduct.post('/getYuandaixibao', productController.GetYuandaixibao);
rProduct.post('/getCas9', productController.GetCas9);
rProduct.post('/getCRISPRi', productController.GetCRISPRi);
rProduct.post('/getLuc1', productController.GetLuc1);
rProduct.post('/getLuc2', productController.GetLuc2);

rProduct.post('/getCell', productController.GetCell);







// 导出路由模块
module.exports = rProduct;