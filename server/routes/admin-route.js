'use strict';
var auth = require('../config/auth'),
    roles = require('../config/roles'),
    controllers = require('../controllers'),
    CONTROLLER_NAME = '/admin';

module.exports = function (_ref) {
    var app = _ref.app;

    app.route(CONTROLLER_NAME + '/list-users').get(auth.isAuthenticated, auth.isInRole([roles.admin]), controllers.admin.listUsers);
};
