'use strict';
var routes = require('../routes');

module.exports = function (_ref) {
    var app = _ref.app;

    routes.usersRoute(app);
    routes.defaultRoute(app);
};
