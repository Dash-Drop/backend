import fs from 'node:fs';
import { GetObjectCommand, S3Client, HeadObjectCommand } from "@aws-sdk/client-s3"; 
import { Upload } from "@aws-sdk/lib-storage"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Region = process.env.S3_REGION;
const bucketName = process.env.S3_BUCKET;

const s3Client = new S3Client({
  region: s3Region
});

export class S3Service {
  async getFileByKey(id: string) {
    const file = await s3Client.send(new GetObjectCommand({Bucket: bucketName, Key: id}));

    console.log(await file.Body.transformToByteArray());
  }

  async uploadFile(filePath: string, key: string, type: string) {
    // UPLOAD FILE TO S3
    const fileStream = fs.createReadStream(filePath);

    const uploadCommand = new Upload({
      client: s3Client,
      params: {
        ACL: "private",
        Bucket: bucketName,
        Key: key,
        Body: fileStream,
        ContentType: type,
      }
    })

    uploadCommand.on("httpUploadProgress", (progress) => {
      console.log(progress);
    });

    await uploadCommand.done();

    return `s3://${bucketName}/${key}`;
  }

  async getDownloadSignedUrlByKey(key: string) {
    const headObjectCommand = new HeadObjectCommand({Bucket: bucketName, Key: key});
    
    await s3Client.send(headObjectCommand);
    
    const getObjectCommand = new GetObjectCommand({Bucket: bucketName, Key: key});
    const downloadUrl = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600,  } );

    return downloadUrl;
  }
}
