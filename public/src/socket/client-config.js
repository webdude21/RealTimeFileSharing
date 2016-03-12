(function (io, socketStream, $, window, eventHandlers, Object) {
	var socket = io(window.location.host);

	Object.keys(eventHandlers.socket).forEach(function (event) {
		socket.on(event, eventHandlers.socket[event]);
	});
	Object.keys(eventHandlers.socketStream).forEach(function (event) {
		socketStream(socket).on(event, eventHandlers.socketStream[event]);
	});

	function uploadFileToTheServer(file, clientId) {
		var stream = socketStream.createStream(),
			$progressBar = $('#file-upload-progress-bar'),
			currentProgress = 0;

		socketStream(socket).emit('file-upload', stream, {
			size: file.size,
			name: file.name,
			client: clientId
		});
		socketStream.createBlobReadStream(file).pipe(stream);

		stream.on('data', function (data) {
			currentProgress = eventHandlers.updateProgressBar($progressBar, currentProgress + data.length, file.size);
		});
	}

	$(function () {
		var $fileInput = $('#file'),
			$fileSubmitButton = $('#file-send-btn');

		$fileSubmitButton.click(function () {
			var file = $fileInput[0].files[0],
				clientId = $('#comment').val();

			if (!file) {
				alert('Моля изберете файл преди да го изпратите');
			} else if (!clientId) {
				alert('Моля изберете потребител на който да пратите файла');
			} else {
				uploadFileToTheServer(file, clientId);
			}

			return false;
		});
	});
}(io, ss, jQuery, window, realTimeFileSharing.eventHandlers, Object));
