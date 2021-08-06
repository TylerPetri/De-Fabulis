const router = require('express').Router();
const AWS = require('aws-sdk');

const awsConfig = {
  region: 'us-east-2',
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Library-of-Stories-Tags';

router.get('/tags', (req, res) => {
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

router.post('/tags', (req, res) => {
  req.body.tags.forEach((tags) => {
    const params = {
      TableName: TABLE_NAME,
      ProjectionExpression: '#ta, #qt',
      KeyConditionExpression: '#ta = :ta',
      ExpressionAttributeNames: {
        '#ta': 'tag',
        '#qt': 'quantity',
      },
      ExpressionAttributeValues: {
        ':ta': tags,
      },
      ScanIndexForward: false,
    };
    dynamodb.query(params, (err, data) => {
      if (err) {
        res.status(500).json(err);
      } else if (data.Items.length > 0) {
        console.log(data.Items[0].tag, data.Items[0].quantity);
        dynamodb.update(
          {
            TableName: TABLE_NAME,
            Key: { tag: data.Items[0].tag },
            UpdateExpression: 'SET quantity = :quantity',
            ExpressionAttributeValues: {
              ':quantity': data.Items[0].quantity + 1,
            },
          },
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log('Updated quantity:', JSON.stringify(data, null, 2));
            }
          }
        );
      } else {
        dynamodb.put(
          {
            TableName: TABLE_NAME,
            Item: {
              tag: tags,
              quantity: 0,
            },
          },
          (err, data) => {
            if (err) {
              console.log(err);
              // res.json(500).json(err);
            } else {
              console.log('Added Item:', JSON.stringify(data, null, 2));
              //   res.status(200).json({ message: 'Added Item' });
            }
          }
        );
      }
    });
  });
  // dynamodb.update()
});

module.exports = router;
