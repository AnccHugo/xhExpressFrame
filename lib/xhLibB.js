const os = require('os');
const fs = require('fs');
const http = require('http');
const https = require('https');
const colors = require('colors');
const config = require('../config/config');
const express = require('express');






/**
 * @name 日志类
 * @description 服务器日志输出类
*/
function Log() {
    this.name = "xhLog";
}

// 日志等级
Log.Level = {
    Debug: {
        name: "调试",
        color: "gray",
    },
    Info: {
        name: "信息",
        color: "white",
    },
    Normal: {
        name: "正常",
        color: "green",
    },
    Notice: {
        name: "提示",
        color: "blue",
    },
    Warning: {
        name: "警告",
        color: "yellow",
    },
    Error: {
        name: "错误",
        color: "red",
    },
};

// 拼接日志
Log.ConcatMsg = function (args) {
    let message = '';
    if (typeof (args) == 'object' || typeof (args) == 'Array') {
        for (let x in args) {
            if (typeof (args[x]) == 'object' || typeof (args[x]) == 'Array') {
                message += this.ConcatMsg(args[x]);
                continue;
            }

            message += ' [';
            if (!Number(x) && x != '0') {
                message = message + x + '：';
            }

            message += args[x];
            message += ']';
        }
    }

    return message;
};

/**
 * @param {object} logObj 日志对象 {name, color}
 * @param {string} msg 日志内容 
 * @param {...any} args
 */
Log.Print = function (logObj, ...args) {
    let message = `[${Time.GetDate()} ${Time.GetTime()}]`;
    let arg = Array.prototype.slice.call(args);

    let color = logObj.color ? logObj.color : "white";
    message += this.ConcatMsg(arg);

    console.log(message[color]);
};






/**
 * @name 时间类
 * @description 服务器时间类
*/
function Time() {
    this.name = "xhTime";
}

Time.FormatDate = function (strDate) {
    if (!strDate || strDate == '0' || strDate == null || strDate == undefined) { strDate = new Date(); }

    strDate = strDate ? strDate : new Date();

    return new Date(strDate);
};

Time.GetDate = function (strDate) {
    let date = new Date(strDate);
    date = Time.FormatDate(strDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    return year + '-' + month + '-' + day;
};

Time.GetTime = function (strDate) {
    let date = new Date(strDate);
    date = Time.FormatDate(strDate);

    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let secondes = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    return hours + ':' + minutes + ':' + secondes;
};

Time.GetDateTime = function (strDate) {
    return Time.GetDate(strDate) + ' ' + Time.GetTime(strDate);
};






/**
 * @method WEB服务器类
 * @param {object} srvConfig 服务器配置对象
 * @param {number} srvConfig.port 服务器端口号
 * @param {string} srvConfig.name 服务器名称
 * @param {string} srvConfig.isRunHttps 是否运行https
 * @param {string} srvConfig.sslKeyPath ssl证书密钥
 * @param {string} srvConfig.sslPemPath ssl证书公钥
*/
function WebServer(srvConfig) {
    srvConfig = srvConfig ? srvConfig : {};

    this.expServer = express();    // express服务器
    this.port = srvConfig.port ? srvConfig.port : 80;
    this.name = srvConfig.name ? srvConfig.name : "WebServer";
    this.domain = srvConfig.domain ? srvConfig.domain : os.hostname();
    this.isRunHttps = srvConfig.isRunHttps ? srvConfig.isRunHttps : false;
    this.sslKeyPath = srvConfig.sslKeyPath ? srvConfig.sslKeyPath : null;
    this.sslPemPath = srvConfig.sslPemPath ? srvConfig.sslPemPath : null;

    let _this = this;
    let _webServer = http.createServer(this.expServer);



    // ========== ========== ==========
    //             公开方法
    // ========== ========== ==========

    this.Run = function () {
        try {
            Log.Print(Log.Level.Info, this.name, '准备开启服务器');

            if (!Init()) {
                Log.Print(Log.Level.Error, this.name, '服务器尚未初始化，无法启动！');
                return;
            }

            _webServer.listen(this.port, () => {
                Log.Print(Log.Level.Normal, this.name, '服务器已启动', 'http://' + this.domain + ':' + this.port);
            });

        } catch (e) {
            console.log(e);
            Log.Print(Log.Level.Error, this.name, '服务器运行失败!', this.domain, this.port);
            return;
        }
    };



    // ========== ========== ==========
    //             私有方法
    // ========== ========== ==========

    function Init() {
        try {
            VerifySSL();

            return true;
        } catch (e) {
            Log.Print(Log.Level.Warning, _this.name, '服务器初始化失败！');
            return false;
        }
    }

    function VerifySSL() {
        try {
            if (_this.isRunHttps) {
                Log.Print(Log.Level.Info, _this.name, '准备创建HTTPS服务器');

                if (fs.existsSync(_this.sslKeyPath) && fs.existsSync(_this.sslPemPath)) {
                    const sslOption = {
                        key: fs.readFileSync(_this.sslKeyPath),
                        cert: fs.readFileSync(_this.sslPemPath)
                    };

                    _webServer = https.createServer(sslOption, expServer);

                } else { Log.Print(Log.Level.Warning, _this.name, 'SSL证书文件不存在'); }
            }
        } catch (e) {
            Log.Print(Log.Level.Warning, _this.name, '读取SSL证书失败，无法启动HTTPS！');
            return;
        }
    }



}






// 导出所有模块
module.exports = { config, Log, Time, WebServer };