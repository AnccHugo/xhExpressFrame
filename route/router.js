const express = require('express');
const Log = require('../lib/xhLibB').Log;
const config = require('../lib/xhLibB').config;

let name = "Router";
let router = express();



// 全局流量拦截
router.use((req, res, next) => {

    Log.Print(Log.Level.Info, name, '全局路由', req.ip, req.method, req.originalUrl);

    next();
});



router.use('/', (req, res) => {
    res.render('../view/index.html');
    // res.send(false);
});







module.exports = router;