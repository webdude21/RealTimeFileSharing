'use strict';
var routes = require('../routes');

module.exports = function (app) {
    routes.usersRoute(app);
    routes.defaultRoute(app);
};
