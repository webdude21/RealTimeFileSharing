var express = require('express'),
    env = process.env.NODE_ENV || 'development',
    app = express(),
    config = require('./server/config/config')[env],
    socketio = require('socket.io')(app);

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')(config.port);
require('./server/config/routes')(app);

app.listen(config.port);
console.log("Server running on port: " + config.port);
