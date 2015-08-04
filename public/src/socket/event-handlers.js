var realTimeFileSharing = {};
realTimeFileSharing.eventHandlers = (function (window, Blob) {
    var socketHandlers = {
            'connect': function () {
            },
            'hi': function (data) {
                console.log('Hi from ' + data);
            },
            'disconnect': function () {
            }
        },
        socketStreamHandlers = {
            'file-receive': function (upcomingStream, fileInfo) {
                var resultBlob = new Blob([], {type: fileInfo.mime});

                upcomingStream.on('data', function (data) {
                    resultBlob = new Blob([resultBlob, data], {type: fileInfo.mime});
                });

                upcomingStream.on('end', function () {
                    window.open(URL.createObjectURL(resultBlob));
                });
            }
        };

    return {
        socket: socketHandlers,
        socketStream: socketStreamHandlers
    };
}(window, Blob));
