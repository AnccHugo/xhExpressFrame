const os = require('os');
const path = require('path');



module.exports = {
  domain: "localhost",
  // domain: os.hostname || "0.0.0.0",
  webPort: 81,

  isRelease: false,
  isOnLinux: false,
  isRunHttps: false,

  sslKeyPath: path.join(__dirname, '../private/www.ctcc.online.key'),
  sslPemPath: path.join(__dirname, '../private/www.ctcc.online.pem'),

  dbConfig: {
    "testDB": {
      host: "localhost",
      port: 3306,
      user: "root",
      passwod: "ctcc123..",
      database: "ctcc",
    }
  },

  meisenEmailPool: [
    { email: "3236921342@qq.com", city: [] },
    { email: "3239683964@qq.com", city: [] },
    { email: "3093265819@qq.com", city: [] },
    { email: "2939617395@qq.com", city: [] },
    { email: "tianguotianshi@163.com", city: [] },
  ],
  companyEmail: "俊景科技<jjwlkj@aliyun.com>",
  mailSenderProxy: {
    host: 'smtp.aliyun.com',
    port: 465,
    auth: {
      user: 'jjwlkj@aliyun.com',
      pass: 'jUNjING999..'
    }
  },

  mailFrom: '美森细胞<jjwlkj@aliyun.com>',
  mailSender: {
    host: 'smtp.aliyun.com',
    port: 465,
    auth: {
      user: 'jjwlkj@aliyun.com',
      pass: 'jUNjING999...'
    }
  },
  defaultMailOptions: {
    from: '俊景科技<jjwlkj@aliyun.com>',
    to: '1420476380@qq.com',
    subject: 'Hello',
    text: '这是一封来自Node.js的测试邮件。',
    html: '<b>这是一封来自小何的邮件。</b>',
    // 邮件附件写法
    // attachments: [{
    //     filname: 'test.md',
    //     path: './config.js'
    // },{
    // filename: 'content',
    // content:'发送内容'
    // }]

  },

  dataPath: path.join(__dirname, '../__data__'),

};