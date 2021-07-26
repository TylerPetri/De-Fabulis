const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({
  region: 'us-east-2',
});
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
console.log('Importing stories into DynamoDB. Please wait.');
const allUsers = JSON.parse(fs.readFileSync('../seed/stories.json', 'utf8'));
allUsers.forEach((user) => {
  const params = {
    TableName: 'Stories',
    Item: {
      username: user.username,
      createdAt: user.createdAt,
      tags: user.tags,
      title: user.title,
      story: user.story,
      cover: user.cover,
      storySettings: user.storySettings,
      coverSettings: user.coverSettings,
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
