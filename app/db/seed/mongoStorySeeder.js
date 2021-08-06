require('dotenv').config();

let mongoose = require('mongoose');
let { Stories } = require('../mongo-models/index');

mongoose.connect(
  `mongodb+srv://trp53:wolfaboodie234@cluster0.u9uiy.mongodb.net/library-of-stories?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

let seed = [
  {
    username: 'Ela Triem',
    createdAt: 3213151253,
    tags: 'magic',
    title: 'Journey of the hats',
    textCover: 'This is a story about a wizard',
    imageCover: '',
    story: 'Wizard of Trought revisit!',
    storySettings: {
      font: 'white',
      textBackground: 'RGBA(128, 0, 128)',
      background: 'RGBA(173, 216, 230, 0.4)',
    },
    coverSettings: {
      font: 'rgb(255, 235, 59)',
      background: 'black',
      titleFont: 'rgb(255,255,255)',
      titleBackground: 'rgb(41,121,255)',
    },
  },
  {
    username: 'Ivan Haserig',
    createdAt: 1461541245,
    tags: 'Love',
    title: 'Your hourglass',
    textCover: 'This is a story about a memory',
    imageCover: '',
    story: "They found each other's memories in...",
    storySettings: {
      font: 'rgb(216, 22, 138)',
      textBackground: 'black',
      background: 'RGBA(173, 216, 230, 0.4)',
    },
    coverSettings: {
      font: 'rgb(244,67,54)',
      background: 'rgb(0,230,118)',
      titleFont: 'rgb(216, 22, 138)',
      titleBackground: 'black',
    },
  },
  {
    username: 'Alex Vanderwinkle',
    createdAt: 444466,
    tags: 'Alvin',
    title: 'Alvin and the wind',
    textCover:
      '"Breezy morning. White fish and bell peppers with one whole egg. Looking... Seeing... A sip, and he exhaled: "aah.."',
    imageCover: '',
    story:
      'Breezy morning. White fish and bell peppers with one whole egg. Looking... Seeing... A sip, and he exhaled: "aah.."',
    storySettings: {
      font: 'RGBA(255,152,0, 1)',
      textBackground: 'RGBA(41,121,255, 1)',
      background: 'RGBA(255,152,0, 0.6)',
    },
    coverSettings: {
      font: 'rgb(255,152,0)',
      background: 'rgb(216, 22, 138)',
      titleFont: 'rgb(216, 22, 138)',
      titleBackground: 'rgb(255,152,0)',
    },
  },
  {
    username: 'Ash Parker',
    createdAt: 234623462346234,
    tags: 'Run',
    title: 'Trip to OMG RUN',
    textCover: '',
    imageCover:
      'https://library-stories-images8c6538a5-342d-47e6-a09d-9e86aa08b522.s3.us-east-2.amazonaws.com/13788c52-7291-41f7-94c7-411f05328464.jpg',
    story: 'RUN!',
    storySettings: {
      font: 'rgb(255,255,255)',
      textBackground: 'RGBA(128, 128, 128, 1)',
      background: 'RGBA(255,152,0, 0.6)',
    },
    coverSettings: {
      font: 'black',
      background: 'rgb(0,230,118)',
      titleFont: 'rgb(255, 235, 59)',
      titleBackground: 'rgb(41,121,255))',
    },
  },
];

Stories.deleteMany({})
  .then(() => Stories.collection.insertMany(seed))
  .then((data) => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
