var app = require('express')(),
    env = process.env.NODE_ENV || 'development',
    httpServer = require('http').createServer(app),
    config = require('./server/config/config')[env],
    io = require('socket.io').listen(httpServer);

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')(config.port);
require('./server/config/routes')(app);
require('./server/config/socket')(io);

httpServer.listen(config.port);
console.log("Server running on port: " + config.port);
