'use strict';
var routes = require('../routes');

module.exports = function ({ app }) {
	routes.adminRoute(app);
	routes.usersRoute(app);
	routes.shareRoute(app);
	routes.defaultRoute(app);
};
