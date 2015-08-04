'use strict';

var app = require('express')(),
    env = process.env.NODE_ENV || 'development',
    httpServer = require('http').createServer(app),
    config = require('./server/config/config')[env],
    io = require('socket.io').listen(httpServer),
    staticCacheAge = 86400000;
require('./server/config/')({ app: app, config: config, io: io, staticCacheAge: staticCacheAge });

httpServer.listen(config.port);
console.log("Server running on port: " + config.port);
