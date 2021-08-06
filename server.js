const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const apiRouter = require('./app/router/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log('mongodb db connection established');
// });

apiRouter(app);

app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
