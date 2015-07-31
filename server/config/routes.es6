'use strict';
var routes = require('../routes');

module.exports = function ({app}) {
    routes.usersRoute(app);
    routes.shareRoute(app);
    routes.defaultRoute(app);
};
