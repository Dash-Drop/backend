import { File as FileEntity } from '../entities/File';
import { nanoid } from 'nanoid';
import { createFile, getByFileId, getFiles } from '../db/files';
import { S3Service } from './S3Service';
import { MultipartFile } from 'controllers/files';

const s3Service = new S3Service();

export class FileService {
  // constructor(private readonly db: DB, private readonly s3Client: S3Client) {}

  async getFiles () {
    const files = await getFiles();
  
    return files;
  }

  async getFileById(id: string) {
    const file = await getByFileId(id);
    const s3File = await s3Service.getFileByKey(file.name);

    return file;
  }

  async createNewFile(name: string, expirationHours: number, file: MultipartFile) {
    let filePath: string;
    let newFileId;
    let newFileIdAlreadyExists = false;
    
    do {
      newFileId = nanoid(8);
      const file = await getByFileId(newFileId);
  
      if (file) newFileIdAlreadyExists = true;
    } while (newFileIdAlreadyExists)

    try {
      filePath = await s3Service.uploadFile(file.path, newFileId, file.type);
    } catch(e) {
      throw new Error("Error uploading file to S3.")
    }

    const createdAt = new Date(Date.now());
    const expirationDate = new Date(createdAt);
    expirationDate.setHours(createdAt.getHours() + expirationHours);

    const newFile = new FileEntity(newFileId, name, filePath, createdAt, expirationDate);

    await createFile({
      id: newFileId,
      name: newFile.name,
      path: newFile.path,
      createdAt: newFile.createdAt.toISOString(),
      expirationDate: expirationDate.toISOString(),
    });

    return newFile;
  }

  async downloadFile(id: string) {
    const downloadFileUrl = await s3Service.getDownloadSignedUrlByKey(id);

    return {
      downloadUrl: downloadFileUrl,
    }
  }
}
