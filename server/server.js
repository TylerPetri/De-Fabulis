const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const storiesRoutes = require('./routes/stories');
// const imageRoutes = require('./routes/image-upload');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use('/api/', storiesRoutes);
// app.use('/api/', imageRoutes);

app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
