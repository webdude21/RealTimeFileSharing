'use strict';

var CONTROLLER_NAME = 'share';

module.exports = {
    getFileShare: function getFileShare(req, res) {
        res.render(CONTROLLER_NAME + '/send-files');
    }
};
