import sql from './db';

const tableName = process.env.TABLE_FILES;

console.log(tableName);

export const getFiles = async () => {
  const files = await sql`
    SELECT * FROM ${sql(tableName)};
  `;

  return files
}

export const getByFileId = async (fileId: string) => {
  console.log(fileId);

  const file = await sql`
    SELECT * FROM ${sql(tableName)}
    WHERE file_id = ${fileId};
  `;

  if (!file) {
    throw new Error("File not found");
  };

  return file[0];
}
