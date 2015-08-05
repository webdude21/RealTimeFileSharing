var socketStream = require('socket.io-stream'),
    mime = 'application/octet-stream',
    allSockets = [],
    clientsUpdate = function (hasLoggedIn, socket, io) {
        var socketIndex = allSockets.indexOf(socket);
        console.log(`User ${hasLoggedIn ? 'connected' : 'disconnected'}`);
        console.log(`There are ${allSockets.length} users online`);

        io.emit('update-user-info', allSockets.map(function (client) {
            return client.id;
        }));
        return socketIndex;
    };

module.exports = function ({io}) {
    io.on('connection', function (socket) {
        allSockets.push(socket);
        clientsUpdate(true, socket, io);

        socket.on('disconnect', function () {
            var socketIndex = allSockets.indexOf(socket);
            if (socketIndex > -1) {
                allSockets.splice(socketIndex, 1);
            }
            clientsUpdate(true, socket, io);
        });

        socketStream(socket).on('file-upload', function (stream, {size, name}) {
            var outputStream = socketStream.createStream();
            stream.pipe(outputStream);

            allSockets.forEach(function (clientSocket) {
                if (clientSocket !== socket) {
                    socketStream(clientSocket).emit('file-receive', outputStream, {size, name, mime});
                }
            });
        });
    });
};
