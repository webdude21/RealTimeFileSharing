var CONTROLLER_NAME = 'share',
    NO_REFRESH_MESSAGE = {
        warningMessage: `Warning: if you close the browser/tab, refresh
    page or click on any links before the download/upload completes`
    };

module.exports = {
    getFileShare: function (req, res) {
        res.render(CONTROLLER_NAME + '/send-files', NO_REFRESH_MESSAGE);
    },
    receiveFile: function (req, res) {
        res.render(CONTROLLER_NAME + '/file-receive', NO_REFRESH_MESSAGE)
    }
};