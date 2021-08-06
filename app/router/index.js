const storiesRoutes = require('./stories');
const usersRoutes = require('./login-register');
const authRoutes = require('./authentication');
const pwdRecoveryRoute = require('./password-recovery');
const tagsRoutes = require('./tags');
const imageRoutes = require('./image-upload');

module.exports = function (app) {
  app.use('/api/', storiesRoutes);
  app.use('/api/', usersRoutes);
  app.use('/api/', authRoutes);
  app.use('/api/', pwdRecoveryRoute);
  app.use('/api/', tagsRoutes);
  app.use('/api/', imageRoutes);
};
