const { v4: uuidv4 } = require('uuid');

const params = (fileName) => {
  const myFile = fileName.originalname.split('.');
  const fileType = myFile[myFile.length - 1];

  const imageParams = {
    Bucket: 'library-stories-images8c6538a5-342d-47e6-a09d-9e86aa08b522',
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
    ACL: 'public-read',
  };

  return imageParams;
};

module.exports = params;
