var realTimeFileSharing = {};
realTimeFileSharing.eventHandlers = (function (window, Blob, $) {
    function updateProgressBar($progressBar, currentProgress, total) {
        $progressBar.width(Math.floor(currentProgress / total * 100) + '%');
        return currentProgress
    }

    var socketHandlers = {
            'connect': function () {
            },
            'disconnect': function () {
            },
            'get-my-user-info': function (connectionId) {
                $('#connection').val(connectionId);
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
                var resultBlob = new Blob([], {type: fileInfo.mime}),
                    $progressBar = $('#file-download-progress-bar'),
                    currentProgress = 0;

                upcomingStream.on('data', function (data) {
                    currentProgress = updateProgressBar($progressBar, currentProgress + data.length, fileInfo.size);
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
