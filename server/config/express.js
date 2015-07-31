'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    morgan = require('morgan'),
    STATIC_DIRECTORY = '/public/compiled',
    secretPassPhrase = 'XZASDIAJSuiasfjuuhasfuhSAFHuhasffaioASJF',
    messageHandler = require('../utilities/message-handler'),
    middleware = require('../middleware');

module.exports = function (_ref) {
    var app = _ref.app;
    var config = _ref.config;

    app.use(compression());
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');
    app.use(cookieParser(secretPassPhrase));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({ secret: secretPassPhrase, saveUninitialized: true, resave: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express['static'](config.rootPath + STATIC_DIRECTORY));
    app.use(morgan('combined'));
    app.use(function (req, res, next) {
        return messageHandler(req, res, next, app);
    });
    app.use(function (req, res, next) {
        return middleware.user(req, res, next, app);
    });
};
