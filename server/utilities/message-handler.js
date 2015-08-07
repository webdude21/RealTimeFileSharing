'use strict';
module.exports = function (req, res, next, app) {

    if (req.session.errorMessage) {
        app.locals.errorMessage = req.session.errorMessage;
        req.session.errorMessage = undefined;
    } else {
        app.locals.errorMessage = undefined;
    }

    if (req.session.successMessage) {
        app.locals.successMessage = req.session.successMessage;
        req.session.successMessage = undefined;
    } else {
        app.locals.successMessage = undefined;
    }

    next();
};
