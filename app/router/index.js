/* MongoDB Routes */
const storiesRoutes = require('./mongo-routes/stories');
const tagsRoutes = require('./mongo-routes/tags');

/* DynamoDB Routes */
const usersRoutes = require('./dynamodb-routes/login-register');
const authRoutes = require('./dynamodb-routes/authentication');
const pwdRecoveryRoute = require('./dynamodb-routes/password-recovery');
const imageRoutes = require('./dynamodb-routes/image-upload');

module.exports = function (app) {
  app.use('/api/', storiesRoutes);
  app.use('/api/', tagsRoutes);
  app.use('/api/', usersRoutes);
  app.use('/api/', authRoutes);
  app.use('/api/', pwdRecoveryRoute);
  app.use('/api/', imageRoutes);
};
