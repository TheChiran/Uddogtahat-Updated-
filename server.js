var server = require('cluster');
var numCPUs = require('os').cpus().length;

if (server.isMaster) {

    for (var i = 0; i < numCPUs; i++) {
        server.fork();
    }

    server.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {

    //change this line to Your Node.js app entry point.
    require("./app.js");
}
