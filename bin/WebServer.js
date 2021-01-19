const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const router = require('../route/router')
const express = require('express');
const Util = require('../service/xhLibB');
const express_art_template = require('express-art-template');

const Log = Util.Log;
const config = Util.config;



/**
 * @description WEB服务器类
 * @param {name} 服务器名称
*/

module.exports = WebServer;

function WebServer(...args) {
    const expServer = express();    // express服务器

    this.inited = false;
    this.name = args[0] ? args[0] : "WebServer";
    this.webServer = http.createServer(expServer);

    let _this = this;



    // ========== ========== ==========
    //             公开方法
    // ========== ========== ==========

    this.Run = function () {
        try {
            if (!this.inited) {
                Log.Print(Log.Level.Error, this.name, '服务器尚未初始化，无法启动！');
                return;
            }

            this.webServer.listen(config.webPort, config.domain, () => {
                Log.Print(Log.Level.Notice, this.name, '服务器已启动', 'http://' + config.domain + ':' + config.webPort);
            });

        } catch (e) {
            Log.Print(Log.Level.Error, this.name, '服务器运行失败!', config.domain, config.webPort);
            return;
        }
    };






    // ========== ========== ==========
    //             私有方法
    // ========== ========== ==========

    function Init() {
        try {
            VerifySSL();
            LoadMiddleWare();

            _this.inited = true;
        } catch (e) {
            Log.Print(Log.Level.Warning, _this.name, '服务器初始化失败！');
            return false;
        }
    }

    function VerifySSL() {
        try {
            if (config.isRunHttps && fs.existsSync(config.sslKeyPath) && fs.existsSync(config.sslPemPath)) {
                const sslOption = {
                    key: fs.readFileSync(config.sslKeyPath),
                    cert: fs.readFileSync(config.sslPemPath)
                };

                _this.webServer = https.createServer(sslOption, expServer);
            }
        } catch (e) {
            Log.Print(Log.Level.Warning, _this.name, '读取SSL证书失败，无法启动HTTPS！');
            return;
        }
    }

    function LoadMiddleWare() {
        try {
            // 模板引擎
            expServer.engine('html', express_art_template);

            // 静态目录托管
            expServer.use('/public', express.static(path.join(__dirname, '../public')));

            // 加载自定义路由
            expServer.use(router);
        } catch (e) {
            Log.Print(Log.Level.Warning, _this.name, '加载中间件失败！');
            throw new Error();
        }
    }






    // 自动运行初始化方法
    Init();
}

