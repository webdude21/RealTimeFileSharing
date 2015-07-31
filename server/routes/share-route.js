'use strict';

var controllers = require('../controllers');

module.exports = function (app) {
    app.route('/file-share').get(controllers.share.getFileShare);
};
