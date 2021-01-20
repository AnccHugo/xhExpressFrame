const WebServer = require('./service/WebServer');


// 主入口
Main();

function Main() {
    let webServer = new WebServer();
    webServer.Run();

}


