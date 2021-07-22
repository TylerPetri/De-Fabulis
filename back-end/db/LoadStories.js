const AWS = require('aws-sdk');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
AWS.config.update({
  region: 'us-east-2',
});
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
console.log('Importing thoughts into DynamoDB. Please wait.');
const allUsers = JSON.parse(fs.readFileSync('../seed/stories.json', 'utf8'));
allUsers.forEach((user) => {
  const params = {
    TableName: 'Stories',
    Item: {
      id: uuidv4(),
      username: user.username,
      createdAt: user.createdAt,
      story: user.story,
    },
  };
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to add story',
        user.username,
        '. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log('PutItem succeeded:', user.username);
    }
  });
});
