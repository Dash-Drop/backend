import * as aws from "aws-sdk"; 

const s3 = new aws.S3();
const bucketName = process.env.S3_BUCKET;
export class S3Service {
  async getFileById() {
  }

  async uploadFile() {
    // UPLOAD FILE TO S3
    s3.listObjects({ Bucket: bucketName }, (err, data) => {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });

    // GET S3 FILE PATH
    const mockFilePath = `/s3/${Math.floor(Math.random() * (1000 - 0))}`;
    return mockFilePath;
  }
}
