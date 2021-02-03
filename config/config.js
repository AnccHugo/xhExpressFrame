const path = require('path');



module.exports = {
    domain: "0.0.0.0",
    webPort: 8080,

    isRelease: false,
    isOnLinux: false,
    isRunHttps: false,

    sslKeyPath: path.join(__dirname, '../private/www.ctcc.online.key'),
    sslPemPath: path.join(__dirname, '../private/www.ctcc.online.pem'),

    // dbConfig: {
    //     "testDB": {
    //         host: "localhost",
    //         port: 3306,
    //         user: "root",
    //         passwod: "ctcc123..",
    //         database: "ctcc",
    //     }
    // }

};