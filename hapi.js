'use strict';

const Hapi = require('hapi'),
    server = new Hapi.Server(),
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
    server.connection({
        port: 3000
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply('Hello, world!');
        }
    });

    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
}
