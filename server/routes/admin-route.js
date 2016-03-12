'use strict';
var auth = require('../config/auth'),
	roles = require('../config/roles'),
	controllers = require('../controllers'),
	BASE_ROUTE = '/admin';

module.exports = function (app) {
	app.route(BASE_ROUTE + '/list-users')
		.get(auth.isAuthenticated, auth.isInRole([roles.admin]), controllers.admin.listUsers);
};
