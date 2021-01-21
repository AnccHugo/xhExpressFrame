const express = require('express');
const Log = require('../lib/xhLibB').Log;
const Time = require('../lib/xhLibB').Time;
const config = require('../lib/xhLibB').config;
const rBase = require('./rBase');

let name = "Router";
let router = express();



// 全局流量拦截
router.use((req, res, next) => {
    Log.Print(Log.Level.Info, name, '全局路由', req.ip, req.method, req.originalUrl);

    // 跨域返回头
    // let origin = config.origin ? config.origin : req.headers.origin;
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // res.header('Content-Type', 'application/json; charset=utf-8');
    res.header('Date', Time.GetDateTime());
    res.header('Expires', Time.GetDateTime());
    res.header('x-timestamp', Time.GetDateTime());
    res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs

    next();
});



// 加载二级路由和默认路由
router.use(rBase);
router.use('/', (req, res) => {
    res.render('../view/index.html');
});






// 导出路由模块
module.exports = router;