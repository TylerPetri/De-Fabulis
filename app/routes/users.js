const router = require('express').Router();
const AWS = require('aws-sdk');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const awsConfig = {
  region: 'us-east-2',
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Stories-Users';

router.get('/users', (req, res) => {
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

router.post('/users', (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: uuidv4(),
      username: req.body.username,
      createdAt: Date.now(),
      password: req.body.password,
    },
    ConditionExpression: 'attribute_not_exists(username)',
  };
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to add item. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      res.status(500).json(err);
    } else {
      console.log('Added item:', JSON.stringify(data, null, 2));
      res.json({ Added: JSON.stringify(data, null, 2) });
    }
  });
});

module.exports = router;
