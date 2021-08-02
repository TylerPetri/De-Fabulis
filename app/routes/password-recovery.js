const router = require('express').Router();
const AWS = require('aws-sdk');
const bcrypt = require('bcrypt');

const awsConfig = {
  region: 'us-east-2',
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();

router.get('/searchOne/:username', (req, res) => {
  const params = {
    TableName: 'Stories-Users',
    ProjectionExpression: '#un, #sq',
    KeyConditionExpression: '#un = :un',
    ExpressionAttributeNames: {
      '#un': 'username',
      '#sq': 'securityQuestion',
    },
    ExpressionAttributeValues: {
      ':un': req.params.username,
    },
    ScanIndexForward: false,
  };
  dynamodb.query(params, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else if (data.Items.length > 0) {
      res.status(200).json({ message: 'Found one', data: data.Items[0] });
    } else {
      res.status(401).json({ message: 'No such being' });
    }
  });
});

router.put('/newpassword', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({
        error: er,
      });
    } else {
      const params = {
        TableName: 'Stories-Users',
        Key: { username: req.body.username },
        UpdateExpression: 'SET password = :password',
        ExpressionAttributeValues: {
          ':password': hashedPassword,
        },
      };
      dynamodb.update(params, (err, data) => {
        if (err) {
          console.error(
            'Unable to add item. Error JSON:',
            JSON.stringify(err, null, 2)
          );
        } else {
          console.log('Updated item password:', JSON.stringify(data, null, 2));
          res.status(200).json({ message: 'New password updated' });
        }
      });
    }
  });
});

module.exports = router;
