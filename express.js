'use strict';

const express = require('express'),
    app = express(),
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
    app.get('/', function (req, res) {
        res.send('Hello, world!');
    });

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });

}
