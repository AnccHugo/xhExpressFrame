const os = require('os');
const fs = require('fs');
const http = require('http');
const https = require('https');
const colors = require('colors');
const config = require('../config/config');
const express = require('express');
const nodemailer = require('nodemailer');






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
    this.port = srvConfig.port ? srvConfig.port : 8081;
    this.name = srvConfig.name ? srvConfig.name : "WebServer";
    this.domain = srvConfig.domain ? srvConfig.domain : os.hostname();
    this.isRunHttps = srvConfig.isRunHttps ? srvConfig.isRunHttps : false;
    this.sslKeyPath = srvConfig.sslKeyPath ? srvConfig.sslKeyPath : false;
    this.sslPemPath = srvConfig.sslPemPath ? srvConfig.sslPemPath : false;

    let _this = this;
    let _webServer = http.createServer(this.expServer);
    let loadedHttps = false;


    // ========== ========== ==========
    //             公开方法
    // ========== ========== ==========

    this.Run = function () {
        try {
            Log.Print(Log.Level.Info, this.name, '准备开启服务器');

            if (!_Init()) {
                Log.Print(Log.Level.Error, this.name, '服务器尚未初始化，无法启动！');
                return;
            }

            _webServer.listen(this.port, () => {
                if (loadedHttps) { Log.Print(Log.Level.Normal, this.name, '服务器已启动', 'https://' + this.domain + ':' + this.port); }
                else { Log.Print(Log.Level.Normal, this.name, '服务器已启动', 'http://' + this.domain + ':' + this.port); }
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

    function _Init() {
        try {
            _OpenSSL();

            return true;
        } catch (e) {
            Log.Print(Log.Level.Warning, _this.name, '服务器初始化失败！');
            return false;
        }
    }

    function _OpenSSL() {
        try {
            if (_this.isRunHttps) {
                Log.Print(Log.Level.Info, _this.name, '准备创建HTTPS服务器',_this.sslKeyPath,  _this.sslPemPath);
                
                if (fs.existsSync(_this.sslKeyPath) && fs.existsSync(_this.sslPemPath)) {
                    const sslOption = {
                        key: fs.readFileSync(_this.sslKeyPath),
                        cert: fs.readFileSync(_this.sslPemPath)
                    };

                    _webServer = https.createServer(sslOption, _this.expServer);
                    Log.Print(Log.Level.Normal, _this.name, '创建HTTPS服务器成功');
                    
                    loadedHttps = true;

                } else { Log.Print(Log.Level.Warning, _this.name, 'SSL证书文件不存在'); }
            }
        } catch (e) {
            Log.Print(Log.Level.Warning, _this.name, '读取SSL证书失败，无法启动HTTPS！');
            return;
        }
    }



}






/**
 * @method 邮件类
 * @param {object} sender 邮件发送者
 * @param {string} sender.host 代理服务器域名/IP
 * @param {number} sender.port 代理服务器端口号
 * @param {object} sender.token 代理服务器验证口令
 * @param {string} sender.token.user 用户邮箱地址
 * @param {string} sender.token.pass 用户密码
 */
function Mail(sender) {
    this.name = "Mail";

    let _this = this;
    let transporter = nodemailer.createTransport(sender);



    // ========== ========== ==========
    //             公开方法
    // ========== ========== ==========

    this.SendMail = _SendMail;



    // ========== ========== ==========
    //             私有方法
    // ========== ========== ==========

    /**
     * @method 邮件发送方法
     * @param {object} email 邮件对象
     * @param {string} email.from 邮件发送人地址
     * @param {string} email.to 邮件接收人地址
     * @param {string} email.subject 邮件主题/标题
     * @param {string} email.text 邮件内容
     */
    function _SendMail(email) {
        try {
            if (!email || !email.from || !email.to || !email.subject || !email.text) {
                Log.Print(Log.Level.Warning, _this.name, '邮件参数缺失');
                return;
            }

            transporter.sendMail(email, (err, info) => {
                if (err) { Log.Print(Log.Level.Error, _this.name, '邮件发送失败！'); return;}

                Log.Print(Log.Level.Normal, _this.name, '邮件发送完毕', info.accepted, info, response);
            });
        } catch (e) {
            console.error(e);
            Log.Print(Log.Level.Error, _this.name, '邮件发送失败！');
        }
    }



}












// 导出所有模块
module.exports = { config, Log, Time, WebServer };