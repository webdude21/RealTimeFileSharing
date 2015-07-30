'use strict';

var passport = require('passport');

module.exports = {
    login: function login(req, res, next) {
        var auth = passport.authenticate('local', function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.session.errorMessage = 'Username/Password combination is not valid!';
                next();
            }

            req.logIn(user, function (loginErr) {
                if (loginErr) {
                    return next(loginErr);
                }
                next();
            });
        });

        auth(req, res, next);
    },
    logout: function logout(req, res, next) {
        req.logout();
        next();
    },
    isAuthenticated: function isAuthenticated(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            next();
        }
    },
    isInRole: function isInRole(roles) {
        return function (req, res, next) {
            if (roles instanceof Array) {
                roles.forEach(function (role) {
                    if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                        next();
                    }
                });
            } else if (req.isAuthenticated() && req.user.roles.indexOf(roles) > -1) {
                next();
            } else {
                res.redirect('/login');
            }
        };
    }
};
