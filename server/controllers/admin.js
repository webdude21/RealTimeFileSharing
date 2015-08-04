'use strict';

var CONTROLLER_NAME = 'admin';

module.exports = {
    listUsers: function listUsers(req, res) {
        res.render(CONTROLLER_NAME + '/list-users');
    }
};
