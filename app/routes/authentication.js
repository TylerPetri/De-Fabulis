const router = require('express').Router();
const AWS = require('aws-sdk');

const { deactivateSession, getSession } = require('../session-manager');

const awsConfig = {
  region: 'us-east-2',
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();

router.get('/authentication/:username', (req, res) => {
  let username = req.params.username;

  const params = {
    TableName: 'UserSessions',
    ProjectionExpression: '#un, #ia',
    KeyConditionExpression: '#un = :un',
    ExpressionAttributeNames: {
      '#un': 'username',
      '#ia': 'isActive',
    },
    ExpressionAttributeValues: {
      ':un': username,
    },
    ScanIndexForward: false,
  };
  dynamodb.query(params, async (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({ message: data.Items[0].isActive });
    }
  });
});

router.post('/authentication', (req, res) => {
  let body = req.body;

  const params = {
    TableName: 'Stories-Users',
    ProjectionExpression: '#un, #id',
    KeyConditionExpression: '#un = :un',
    ExpressionAttributeNames: {
      '#un': 'username',
      '#id': 'tempId',
    },
    ExpressionAttributeValues: {
      ':un': body.username,
    },
    ScanIndexForward: false,
  };
  dynamodb.query(params, async (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if (data.Items[0].tempId === body.session) {
        if (body.type === 'logout') {
          deactivateSession(body.username);
          res.status(200).json({ message: 'Session deactivated' });
        } else if (body.type === 'checkAuth') {
          getSession(body.username);
          res.status(200).json({ message: 'Session authenticated' });
        }
      } else {
        res.status(401).json({ message: 'No auth' });
      }
    }
  });
});

module.exports = router;
