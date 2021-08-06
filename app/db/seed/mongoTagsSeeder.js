require('dotenv').config();

let mongoose = require('mongoose');
let { Tags } = require('../mongo-models/index');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

let seed = [
  {
    tag: 'alvin',
    quantity: 1,
  },
  {
    tag: 'love',
    quantity: 1,
  },
  {
    tag: 'magic',
    quantity: 1,
  },
  {
    tag: 'run',
    quantity: 1,
  },
];

Tags.deleteMany({})
  .then(() => Tags.collection.insertMany(seed))
  .then((data) => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
