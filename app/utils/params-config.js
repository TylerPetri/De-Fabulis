const { v4: uuidv4 } = require('uuid');

const params = (fileName) => {
  const myFile = fileName.originalname.split('.');
  const fileType = myFile[myFile.length - 1];

  const imageParams = {
    Bucket: 'user-images-8132ab10-02d6-4bb8-a02a-16701faa794d',
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
    ACL: 'public-read',
  };

  return imageParams;
};

module.exports = params;
