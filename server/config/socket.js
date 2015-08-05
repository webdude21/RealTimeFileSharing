'use strict';

var socketStream = require('socket.io-stream'),
    mime = 'application/octet-stream',
    allSockets = [],
    clientsUpdate = function clientsUpdate(hasLoggedIn, socket, io) {
    var socketIndex = allSockets.indexOf(socket);
    console.log('User ' + (hasLoggedIn ? 'connected' : 'disconnected'));
    console.log('There are ' + allSockets.length + ' users online');

    io.emit('update-user-info', allSockets.map(function (client) {
        return client.id;
    }));
    return socketIndex;
};

module.exports = function (_ref) {
    var io = _ref.io;

    io.on('connection', function (socket) {
        allSockets.push(socket);
        clientsUpdate(true, socket, io);

        socket.emit('get-my-user-info', socket.id);

        socket.on('disconnect', function () {
            var socketIndex = allSockets.indexOf(socket);
            if (socketIndex > -1) {
                allSockets.splice(socketIndex, 1);
            }
            clientsUpdate(true, socket, io);
        });

        socketStream(socket).on('file-upload', function (stream, _ref2) {
            var size = _ref2.size;
            var name = _ref2.name;
            var client = _ref2.client;

            var outputStream = socketStream.createStream(),
                clientToSendTheFileTo = null;

            allSockets.some(function (item) {
                if (item.id === client) {
                    clientToSendTheFileTo = item;
                    return true;
                }
            });

            if (!clientToSendTheFileTo) {
                return;
            }

            stream.pipe(outputStream);
            socketStream(clientToSendTheFileTo).emit('file-receive', outputStream, { size: size, name: name, mime: mime });
        });
    });
};
