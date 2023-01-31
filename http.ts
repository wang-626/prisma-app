import * as http from "http"
var server = http.createServer(function (req, res) {

    if (req.url == '/') { //check the URL of the current request
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: "Hello World in http" }));
        res.end();
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end();
    }
});

server.listen(3001);

console.log('Node.js web server at port 3001 is running..')