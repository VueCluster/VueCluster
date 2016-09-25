var SocketCluster = require('socketcluster').SocketCluster,
    os = require('os'),
    fs = require('fs'),
    config = require('./config.json')

var options = {
    workers: os.cpus().length || 1,
    brokers: 1,
    port: config.port,
    wsEngine: 'uws',
    appName: config.name || 'sc-app',
    workerController: __dirname + '/worker.js',
    brokerController: __dirname + '/broker.js',
    initController: __dirname + '/init.js',
    socketChannelLimit: 1000,
    crashWorkerOnError: true
}

if (config.redis) {
    options.brokerOptions = {
        host:config.redis.host || 'localhost',
        port:config.redis.port || 6379
    }
}

var socketCluster = new SocketCluster(options)
