import sql from './db';

type CreateFileParams = {
  id: string;
  name: string;
  path: string;
  createdAt: string;
  expirationDate: string;
}

const tableName = process.env.TABLE_FILES;


export const getFiles = async () => {
  const files = await sql`
    SELECT * FROM ${sql(tableName)};
  `;

  return files;
}

export const getByFileId = async (fileId: string) => {
  const file = await sql`
    SELECT * FROM ${sql(tableName)}
    WHERE id = ${fileId};
  `;

  if (!file) {
    throw new Error("File not found");
  };

  return file[0];
}

export const createFile = async ({id, name, path, createdAt, expirationDate}: CreateFileParams) => {
  const test = await sql`
  INSERT INTO files (id, name, path, createdAt, expirationDate)
    VALUES (${id}, ${name}, ${path}, ${createdAt}, ${expirationDate});
  `;

  if (!test) {
    throw new Error("Error creating new file");
  }
}
