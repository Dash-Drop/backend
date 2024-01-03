import sql from './db';

type FileDAO = {
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
  const fileRows = await sql<FileDAO[]>`
    SELECT * FROM ${sql(tableName)}
    WHERE id = ${fileId};
  `;

  if (!fileRows) {
    throw new Error("File not found");
  };

  const file = fileRows[0];

  return file;
}

export const createFile = async ({id, name, path, createdAt, expirationDate}: FileDAO) => {
  const test = await sql`
  INSERT INTO files (id, name, path, createdAt, expirationDate)
    VALUES (${id}, ${name}, ${path}, ${createdAt}, ${expirationDate});
  `;

  if (!test) {
    throw new Error("Error creating new file");
  }
}
