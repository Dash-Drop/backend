export const uploadFileService = (): string => {
  // UPLOAD FILE TO S3

  // GET S3 FILE PATH

  const mockFilePath = `/s3/${Math.floor(Math.random() * (1000 - 0))}`;
  return mockFilePath;
}