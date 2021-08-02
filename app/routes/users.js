const router = require('express').Router();
const AWS = require('aws-sdk');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const {
  createSession,
  deactivateSession,
  getSession,
} = require('../session-manager');

const awsConfig = {
  region: 'us-east-2',
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Stories-Users';

router.post('/login', (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    ProjectionExpression: '#pw, #un, #id',
    KeyConditionExpression: '#un = :un',
    ExpressionAttributeNames: {
      '#pw': 'password',
      '#un': 'username',
      '#id': 'id',
    },
    ExpressionAttributeValues: {
      ':un': req.body.username,
    },
    ScanIndexForward: false,
  };
  dynamodb.query(params, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if (data.Items.length < 1) {
        return res.status(401).json({
          message: 'No such being!',
        });
      } else {
        bcrypt.compare(
          req.body.password,
          data.Items[0].password,
          (err, result) => {
            if (err) {
              return res.status(401).json({
                message: 'Wrong password',
              });
            }
            if (result) {
              return res.status(200).json({
                message: 'Auth successful',
                username: req.body.username,
              });
            }
          }
        );
      }
    }
  });
});

router.post('/register', (req, res) => {
  if (req.body.password.length < 1) {
    res.send({ message: 'Password required' });
  } else {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        bcrypt.hash(req.body.securityAnswer, 10, (err, hashedAnswer) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const params = {
              TableName: TABLE_NAME,
              Item: {
                id: uuidv4(),
                username: req.body.username,
                createdAt: Date.now(),
                password: hashedPassword,
                securityQuestion: req.body.securityQuestion,
                securityAnswer: hashedAnswer,
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
                createSession(data);
                console.log('Added item:', JSON.stringify(data, null, 2));
                res.json({ message: 'Added item' });
              }
            });
          }
        });
      }
    });
  }
});

module.exports = router;
