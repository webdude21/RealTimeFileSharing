'use strict';

var CONTROLLER_NAME = 'share',
    NO_REFRESH_MESSAGE = {
    warningMessage: 'Warning: Do not close the browser/tab, refresh\n    page or click on any links before the file transfer completes, or the progress will be lost!'
};

module.exports = {
    getFileShare: function getFileShare(req, res) {
        res.render(CONTROLLER_NAME + '/send-files', NO_REFRESH_MESSAGE);
    },
    receiveFile: function receiveFile(req, res) {
        res.render(CONTROLLER_NAME + '/file-receive', NO_REFRESH_MESSAGE);
    }
};
