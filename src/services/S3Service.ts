import { GetObjectCommand, ListObjectsCommand, S3Client } from "@aws-sdk/client-s3"; 

const s3Region = process.env.S3_REGION;
const bucketName = process.env.S3_BUCKET;

const s3 = new S3Client({
  region: s3Region
});
export class S3Service {
  async getFileById(id: string) {
    const file = await s3.send(new GetObjectCommand({Bucket: bucketName, Key: id}));

    console.log(await file.Body.transformToByteArray());
  }

  async uploadFile() {
    // UPLOAD FILE TO S3
    const response = await s3.send(new ListObjectsCommand({ Bucket: bucketName }));

    console.log(response);

    // GET S3 FILE PATH
    const mockFilePath = `/s3/${Math.floor(Math.random() * (1000 - 0))}`;
    return mockFilePath;
  }
}
