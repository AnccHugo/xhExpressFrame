const colors = require('colors');
const config = require('../config/config');



// ========== ========== ==========
//             公共空间
// ========== ========== ==========

/**
 * @name 全局通用类
 * @description 小何助手，存放全局通用配置、方法和变量
*/

module.exports = {
    Log: Log,
    Time: Time,
    config: config,
};






// ========== ========== ==========
//             私有空间
// ========== ========== ==========

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



