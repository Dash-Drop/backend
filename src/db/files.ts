import sql from './db';

export const getFiles = async () => {
  const files = await sql`
    SELECT * from files;
  `;

  return files
}