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
  console.log(user);
  const sessionId = generateId(user.username);
  const currentTime = Date.now();

  const sessionInfo = {
    sessionId: sessionId, // Primary Key
    userId: user.username,
    sessionStartTimestamp: currentTime,
    isActive: true,
    expires: currentTime + 1000 * 60 * 60 * 24 * 14,
    userInfo: { id: user.id, username: user.username },
  };
  console.log(sessionInfo);
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

const deactivateSession = async (sessionId) => {
  const session = await dynamodb.updateItem(
    {
      TableName: TABLE_NAME,
      Key: {
        sessionId: sessionId,
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
        res.status(500).json(err);
      } else {
        console.log('Update succeeded.');
        res.json(data.Items);
      }
    }
  );

  return session.Attributes;
};

const getSession = async (sessionId) => {
  const currentTime = Date.now();
  const key = { sessionId: sessionId };

  const response = await dynamodb.query(
    {
      TableName: TABLE_NAME,
      Key: key,
    },
    (err, data) => {
      if (err) {
        console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
        res.status(500).json(err);
      } else {
        console.log('Query succeeded.');
        res.json(data.Items);
      }
    }
  );

  let session = response.Item;

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
            res.status(500).json(err);
          } else {
            console.log('Update succeeded.');
            res.json(data.Items);
          }
        }
      );

      // return update session info
      return { ...session, isActive: false };
    }

    return session;
  }

  const newExpires = currentTime + 1000 * 60 * 60 * 24 * 14; // 14 days from now
  // extend session
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
        console.error('Unable to update. Error:', JSON.stringify(err, null, 2));
        res.status(500).json(err);
      } else {
        console.log('Update succeeded.');
        res.json(data.Items);
      }
    }
  );

  // return session info with new expiry date
  return { ...session, expires: newExpires };
};

module.exports = { createSession, deactivateSession, getSession };
