'use strict';
module.exports = function (req, res, next, app) {
    var errorTypes = ['errorMessage', 'successMessage', 'warningMessage'],
        processMessage = function (messageKey) {
            if (req.session[messageKey]) {
                app.locals[messageKey] = req.session[messageKey];
                req.session[messageKey] = undefined;
            } else {
                app.locals[messageKey] = undefined;
            }
        };

    errorTypes.forEach(processMessage);
    next();
};
