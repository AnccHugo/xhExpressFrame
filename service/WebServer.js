const Log = require('../lib/xhLibB').Log;
const path = require('path');
const router = require('../route/router');
const config = require('../lib/xhLibB').config;
const express = require('express');
const xhWebServer = require('../lib/xhLibB').WebServer;
const express_art_template = require('express-art-template');



function WebServer() {
    const srvConfig = {
        port: config.webPort,
        domain: config.domain,
    };

    let webServer = new xhWebServer(srvConfig);
    let _expServer = webServer.expServer;


    // ========== ========== ==========
    //             公开方法
    // ========== ========== ==========

    this.Run = function () {
        if (!Init()) { return; };

        webServer.Run();
    }



    // ========== ========== ==========
    //             私有方法
    // ========== ========== ==========

    function Init() {
        try {
            Log.Print(Log.Level.Info, webServer.name, '初始化服务器');

            LoadMiddle();

            return true;
        } catch (e) {
            console.error(e);
            Log.Print(Log.Level.Error, webServer.name, '加载中间件失败!');
            return false;
        }
    }

    function LoadMiddle() {
        Log.Print(Log.Level.Info, webServer.name, '加载中间件');

        _expServer.engine('html', express_art_template);
        _expServer.use('/public', express.static(path.join(__dirname, '../public')));
        _expServer.use(router);
    }

}






module.exports = WebServer;