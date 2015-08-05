'use strict';
var routes = require('../routes');

module.exports = function (_ref) {
    var app = _ref.app;

    routes.adminRoute(app);
    routes.usersRoute(app);
    routes.shareRoute(app);
    routes.defaultRoute(app);
};
