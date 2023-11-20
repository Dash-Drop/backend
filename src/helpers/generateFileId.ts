const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default function generateFileId (length: number = 8) {
  let id = '';

  const charactersLength = characters.length;

  for ( let i = 0; i < length; i++ ) {
    id += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return id;
}
