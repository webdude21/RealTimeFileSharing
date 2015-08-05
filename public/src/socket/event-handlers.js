var realTimeFileSharing = {};
realTimeFileSharing.eventHandlers = (function (window, Blob, $) {
    var socketHandlers = {
            'connect': function () {
            },
            'disconnect': function () {
            },
            'update-user-info': function (clients) {
                var $table = $('.users'),
                    tableContent = '';

                clients.forEach(function (socket, index) {
                    tableContent += '<tr class="info"><td>' + (index + 1) + '</td><td>' + socket + '</td></tr>';
                });

                $table.html(tableContent);
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
}(window, Blob, jQuery));
