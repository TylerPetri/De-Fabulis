const mongoose = require('mongoose');
const router = require('express').Router();
const { Stories } = require('../../db/mongo-models/index');

router.get('/stories', (req, res) => {
  Stories.find({}, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

router.post('/publish', (req, res) => {
  new Stories({
    _id: mongoose.Types.ObjectId(),
    createdAt: Date.now(),
    username: req.body.username,
    textCover: req.body.textCover,
    imageCover: req.body.imageCover,
    title: req.body.title,
    story: req.body.story,
    tags: req.body.tags,
    storySettings: req.body.storySettings,
    coverSettings: req.body.coverSettings,
  }).save((err, data) => {
    if (err) {
      console.error(
        'Unable to add item. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      res.json({ message: 'Error has occurred' });
    } else {
      res.json({ message: 'Added item', Added: JSON.stringify(data, null, 2) });
    }
  });
});

module.exports = router;
