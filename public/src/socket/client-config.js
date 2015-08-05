(function (io, socketStream, $, window, eventHandlers, Object) {
    var socket = io(window.location.host);

    Object.keys(eventHandlers.socket).forEach(function (event) {
        socket.on(event, eventHandlers.socket[event]);
    });
    Object.keys(eventHandlers.socketStream).forEach(function (event) {
        socketStream(socket).on(event, eventHandlers.socketStream[event]);
    });

    function uploadFileToTheServer(file, clientId) {
        var stream = socketStream.createStream();
        socketStream(socket).emit('file-upload', stream, {size: file.size, name: file.name}, clientId);
        socketStream.createBlobReadStream(file).pipe(stream);
    }

    $(function () {
        var $fileInput = $('#file'),
            $fileSubmitButton = $('#file-send-btn');

        $fileSubmitButton.click(function (event) {
            var file = $fileInput.files[0];

            if (file) {
                uploadFileToTheServer(file)
            } else {
                alert('Моля изберете файл преди да го изпратите');
            }

            return false;
        });
    });
}(io, ss, jQuery, window, realTimeFileSharing.eventHandlers, Object));

