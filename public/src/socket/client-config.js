(function (io, socketStream, $, window, eventHandlers) {
    var socket = io(window.location.host);

    Object.keys(eventHandlers.socket).forEach(function (event) {
        socket.on(event, eventHandlers.socket[event]);
    });
    Object.keys(eventHandlers.socketStream).forEach(function (event) {
        socketStream(socket).on(event, eventHandlers.socketStream[event]);
    });

    function uploadFileToTheServer(file) {
        var stream = socketStream.createStream();
        socketStream(socket).emit('file-upload', stream, {size: file.size, name: file.name});
        socketStream.createBlobReadStream(file).pipe(stream);
    }

    $(function () {
        var $fileInput = $('#file');
        $fileInput.change(function (event) {
            uploadFileToTheServer(event.target.files[0]);
        });
    });
}(io, ss, $, window, realTimeFileSharing.eventHandlers));

