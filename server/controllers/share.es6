var CONTROLLER_NAME = 'share';

module.exports = {
    getFileShare: function (req, res) {
        res.render(CONTROLLER_NAME + '/send-files');
    }
};