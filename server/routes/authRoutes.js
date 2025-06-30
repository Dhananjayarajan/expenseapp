const passport = require('passport');

module.exports = (app) => {
  const redirectDomainURL = process.env.REDIRECT_URL || 'http://localhost:5173';

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect(`${redirectDomainURL}`);
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    res.redirect(`${redirectDomainURL}`);
  });

  app.get('/api/currentuser', (req, res) => {
    res.send(req.user);
  });
};
