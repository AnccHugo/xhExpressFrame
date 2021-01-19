const path = require('path');



module.exports = {
    domain: "localhost",
    webPort: 80,

    isRelease: false,
    isOnLinux: false,
    isRunHttps: true,

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
    }

};