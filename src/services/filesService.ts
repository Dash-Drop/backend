import { File } from '../entities/File';
import { nanoid } from 'nanoid';
import { createFile, getByFileId, getFiles } from '../db/files';
import { uploadFileService } from './S3Service';

export class FileService {
  // constructor(private readonly db: DB, private readonly s3Client: S3Client) {}

  async getFiles () {
    const files = await getFiles();
  
    return files;
  }

  async getFileById(id: string) {
    const file = await getByFileId(id);

    return file;
  }

  async createNewFile(name: string, expirationHours: number) {
    const filePath = uploadFileService();

    let newFileId;
    let newFileIdAlreadyExists = false;
    
    do {
      newFileId = nanoid(8);
      const file = await getByFileId(newFileId);
  
      if (file) newFileIdAlreadyExists = true;
    } while (newFileIdAlreadyExists)

    const createdAt = new Date(Date.now());
    const expirationDate = new Date(createdAt);
    expirationDate.setHours(createdAt.getHours() + expirationHours);

    const newFile = new File(newFileId, name, filePath, createdAt, expirationDate);

    await createFile({
      id: newFileId,
      name: newFile.name,
      path: newFile.path,
      createdAt: newFile.createdAt.toISOString(),
      expirationDate: expirationDate.toISOString(),
    });

    return newFile;
  }
}
