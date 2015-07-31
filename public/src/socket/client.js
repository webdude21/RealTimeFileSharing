(function (io) {
    var socket = io('http://localhost:3000');
    socket.on('connect', function () {
        socket.emit('message', 'gosho', 'fostata');
    });
    socket.on('event', function (data) {
    });
    socket.on('disconnect', function () {
    });
}(io));