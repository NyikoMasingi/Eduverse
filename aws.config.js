const { S3Client } = require('@aws-sdk/client-s3')
require("dotenv").config();


const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEY, 
    secretAccessKey: process.env.AWS_SECRETKEY
  }
});

module.exports = s3Client;