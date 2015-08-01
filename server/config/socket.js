'use strict';

var socketStream = require('socket.io-stream'),
    mime = 'application/octet-stream',
    allSockets = [],
    printUserInfo = function printUserInfo(hasLoggedIn, socket) {
    var socketIndex = allSockets.indexOf(socket);
    console.log('User ' + (hasLoggedIn ? 'connected' : 'disconnected'));
    console.log('There are ' + allSockets.length + ' users online');

    return socketIndex;
};

module.exports = function (_ref) {
    var io = _ref.io;

    io.on('connection', function (socket) {
        allSockets.push(socket);

        printUserInfo(true, socket);
        io.emit('hi', socket.id);

        socket.on('disconnect', function () {
            var socketIndex = allSockets.indexOf(socket);
            if (socketIndex > -1) {
                allSockets.splice(socketIndex, 1);
            }
            printUserInfo(false, socket);
        });

        socketStream(socket).on('file-upload', function (stream, _ref2) {
            var size = _ref2.size;
            var name = _ref2.name;

            var outputStream = socketStream.createStream();
            stream.pipe(outputStream);

            allSockets.forEach(function (clientSocket) {
                if (clientSocket !== socket) {
                    socketStream(clientSocket).emit('file-receive', outputStream, { size: size, name: name, mime: mime });
                }
            });
        });
    });
};
