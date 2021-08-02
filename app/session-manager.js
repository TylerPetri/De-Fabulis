const AWS = require('aws-sdk');
const bcrypt = require('bcrypt');
const awsConfig = {
  region: 'us-east-2',
};
AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UserSessions';

const generateId = (userId) => {
  const hashInput = `${Date.now()}${userId}${Math.floor(
    Math.random() * 100000
  )}`;
  const generatedId = bcrypt.hashSync(hashInput, 10);
  return generatedId;
};

const createSession = (user) => {
  const sessionId = generateId(user.username);
  const currentTime = Date.now();

  const sessionInfo = {
    sessionId: sessionId,
    username: user.username,
    sessionStartTimestamp: currentTime,
    isActive: false,
    expires: currentTime + 1000 * 60 * 60 * 24 * 14,
    userInfo: { id: user.id, username: user.username },
  };
  dynamodb.put(
    {
      TableName: TABLE_NAME,
      Item: sessionInfo,
    },
    (err, data) => {
      if (err) {
        console.error('Unable to put. Error:', JSON.stringify(err, null, 2));
      } else {
        console.log('Put succeeded.');
      }
    }
  );

  return sessionInfo;
};

const deactivateSession = (username) => {
  dynamodb.update(
    {
      TableName: TABLE_NAME,
      Key: {
        username: username,
      },
      UpdateExpression: 'SET isActive = :isActive',
      ExpressionAttributeValues: {
        ':isActive': false,
      },
      ReturnValues: 'ALL_NEW',
    },
    (err, data) => {
      if (err) {
        console.error('Unable to update. Error:', JSON.stringify(err, null, 2));
      } else {
        console.log('Update succeeded.');
      }
    }
  );
};

const getSession = (user) => {
  const currentTime = Date.now();
  const key = { username: user };

  const params = {
    TableName: TABLE_NAME,
    ProjectionExpression: '#un, #id, #ex, #ia',
    KeyConditionExpression: '#un = :un',
    ExpressionAttributeNames: {
      '#un': 'username',
      '#id': 'sessionId',
      '#ex': 'expires',
      '#ia': 'isActive',
    },
    ExpressionAttributeValues: {
      ':un': user,
    },
    ScanIndexForward: false,
  };

  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
    } else {
      console.log('Query succeeded.');

      let session = data.Items[0];

      if (currentTime >= session.expires) {
        if (session.isActive) {
          // invalidate session if session is active and it is expired
          dynamodb.update(
            {
              TableName: TABLE_NAME,
              Key: key,
              UpdateExpression: 'SET isActive = :isActive',
              ExpressionAttributeValues: {
                isActive: false,
              },
            },
            (err, data) => {
              if (err) {
                console.error(
                  'Unable to update. Error:',
                  JSON.stringify(err, null, 2)
                );
              } else {
                console.log('Update succeeded.');
              }
            }
          );

          return { ...session, isActive: false };
        }
        return session;
      }

      const newExpires = currentTime + 1000 * 60 * 60 * 24 * 14;
      dynamodb.update(
        {
          TableName: TABLE_NAME,
          Key: key,
          UpdateExpression: 'SET expires = :expires',
          ExpressionAttributeValues: {
            ':expires': newExpires,
          },
        },
        (err, data) => {
          if (err) {
            console.error(
              'Unable to update. Error:',
              JSON.stringify(err, null, 2)
            );
          } else {
            console.log('Update extend session succeeded.');
          }
        }
      );

      // return session info with new expiry date
      return { ...session, expires: newExpires };
    }
  });
};

module.exports = { createSession, deactivateSession, getSession };
