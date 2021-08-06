const mongoose = require('mongoose');
const router = require('express').Router();
const { Tags } = require('../../db/mongo-models/index');

router.get('/tags', (req, res) => {
  Tags.find({}, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

router.post('/tags', (req, res) => {
  req.body.tags.forEach((tags) => {
    Tags.findOne({ tag: tags }, (err, data) => {
      if (data) {
        Tags.updateOne(
          { tag: data.tag },
          { quantity: data.quantity + 1 },
          { new: true },
          (err, data) => {
            if (err) {
              res.status(500).json(err);
            } else {
              console.log('Updated quantity');
              res.status(200).json({ message: 'Updated Item' });
            }
          }
        );
      } else {
        new Tags({
          _id: mongoose.Types.ObjectId(),
          tag: tags,
          quantity: 1,
        }).save();
      }
    });
  });
});

module.exports = router;
