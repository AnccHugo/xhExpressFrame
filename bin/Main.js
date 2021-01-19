const WebSever = require('./WebServer');




Main();
function Main() {
    let webServer = new WebSever();
    webServer.Run();
}