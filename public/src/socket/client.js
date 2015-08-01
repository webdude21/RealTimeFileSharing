(function (io, socketStream, $) {
    var socket = io('http://localhost:3000');
    socket.on('connect', function () {
    });
    socket.on('hi', function (data) {
        console.log('Hi from ' + data);
    });
    socket.on('disconnect', function () {
    });

    socketStream(socket).on('file-receive', function (serverStream, fileInfo) {
        var resultBlob = new Blob([], {type: fileInfo.mime}),
            resultUrl;

        serverStream.on('data', function (data) {
            resultBlob = new Blob([resultBlob, data], {type: fileInfo.mime});
        });

        serverStream.on('end', function () {
            resultUrl = URL.createObjectURL(resultBlob);
            window.open(resultUrl);
        });
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
}(io, ss, $));

