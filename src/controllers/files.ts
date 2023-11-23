import { Request, Response } from 'express';

import generateFileId from '../helpers/generateFileId';
import { getFiles} from '../db/files';

export const getAll = async (req: Request, res: Response) => {
  try {
    const files = await getFiles();

    // if (!files) throw new Error("File not found.");

    return res.status(200).json(files).end();
  } catch (error) {
    console.log(error);

    return res.sendStatus(400);
  }
}

// export const getFile = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const file = await getFileById(id);

//     if (!file) throw new Error("File not found.");

//     return res.status(200).json(file).end();
//   } catch (error) {
//     console.log(error);

//     return res.sendStatus(400);
//   }
// }

// export const createNewFile = async (req: Request, res: Response) => {
//   try {
//     const { path } = req.body;

//     console.log(req.body);

//     if (!path) throw new Error("property \"path\" is required.");

//     // TODO: Check if created ID already exists
//     const newFileId = generateFileId();

//     const newFile = await createFile({
//       id: newFileId,
//       path
//     });

//     return res.status(201).json(newFile).end();
//   } catch (error) {
//     console.log(error);

//     return res.sendStatus(400);
//   }
// }