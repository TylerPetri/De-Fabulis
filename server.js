const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const storiesRoutes = require('./app/routes/stories');
const usersRoutes = require('./app/routes/login-register');
const authRoutes = require('./app/routes/authentication');
const pwdRecoveryRoute = require('./app/routes/password-recovery');
// const tagsRoutes = require('./app/routes/tags');
const imageRoutes = require('./app/routes/image-upload');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use('/api/', storiesRoutes);
app.use('/api/', usersRoutes);
app.use('/api/', authRoutes);
app.use('/api/', pwdRecoveryRoute);
// app.use('/api/', tagsRoutes);
app.use('/api/', imageRoutes);

app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
