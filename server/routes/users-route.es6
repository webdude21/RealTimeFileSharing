var auth = require('../config/auth'),
    controllers = require('../controllers');

module.exports = function (app) {
    app.route('/register')
        .get(controllers.users.getRegister)
        .post(controllers.users.postRegister);

    app.route('/profile')
        .get(auth.isAuthenticated, controllers.users.getProfile)
        .post(auth.isAuthenticated, controllers.users.postProfile);

    app.route('/login')
        .get(controllers.users.getLogin)
        .post(auth.login, controllers.users.postLogin);

    app.route('/logout')
        .get(auth.logout, controllers.users.logout);
};