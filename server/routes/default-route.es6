module.exports = function (app) {
    app.get('/error', (req, res) => res.render('error', {currentUser: req.user}));

    app.post('/*', (req, res) => res.redirect('/'));

    app.get('*', (req, res) => res.render('not-found', {currentUser: req.user}));
};