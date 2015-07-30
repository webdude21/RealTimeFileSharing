'use strict';

var passport = require('passport'),
    LocalPassport = require('passport-local'),
    User = require('mongoose').model('User');

module.exports = function () {
    passport.use(new LocalPassport(function (username, password, done) {
        User.findOne({ username: username }).exec(function (err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
            }

            return user && user.authenticate(password) ? done(null, user) : done(null, false);
        });
    }));
    passport.serializeUser(function (user, done) {
        if (user) {
            return done(null, user.id);
        }
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id).exec(function (err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
            }

            return user ? done(null, user) : done(null, false);
        });
    });
};
