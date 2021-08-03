const router = require('express').Router();
const AWS = require('aws-sdk');

const awsConfig = {
  region: 'us-east-2',
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Stories';

router.get('/stories', (req, res) => {
  const params = {
    TableName: TABLE_NAME,
  };
  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(data.Items);
    }
  });
});

router.post('/publish', (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      username: req.body.username,
      createdAt: Date.now(),
      textCover: req.body.textCover,
      imgCover: req.body.imgCover,
      title: req.body.title,
      story: req.body.story,
      tags: req.body.tags,
      storySettings: req.body.storySettings,
      coverSettings: req.body.coverSettings,
    },
  };
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to add item. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      res.status(500).json({ message: 'Error has occurred' });
    } else {
      console.log('Added item:', JSON.stringify(data, null, 2));
      res.json({ message: 'Added item', Added: JSON.stringify(data, null, 2) });
    }
  });
});

module.exports = router;
