'use strict';

const restify = require('restify'),
    server = restify.createServer(),
    cluster = require('cluster'),
    argv = require('minimist')(process.argv.slice(2));

let procs = argv.p || 1;

if (cluster.isMaster) {

    for (var i = 0; i < procs; i++) {
        cluster.fork();
    }

    cluster.on('death', function (worker) {
        console.log('worker ' + worker.pid + ' died');
    });
}
else {
    server.get('/', function (req, res) {
        res.send('Hello, World!');
    });

    server.listen(process.env.PORT || 3000, function () { // bind server to port 5000.
        console.log('%s listening at %s', server.name, server.url);
    });
}
