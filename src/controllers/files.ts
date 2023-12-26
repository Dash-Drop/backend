import { Request, Response } from 'express';

import { FileService } from '../services/filesService';

type CreateFileDto = {
  name: string;
  expirationHours: number;
}

type OutputFileDto = {
  id: string;
  name: string;
  path: string;
  createdAt: string;
  expirationDate: string;
}

export const getAll = async (req: Request, res: Response) => {
  try {
    const fs = new FileService();
    const files = await fs.getFiles();

    return res.status(200).json(files).end();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }

    return res.status(500).end();
  }
}

export const getFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const fs = new FileService();

    const file = await fs.getFileById(id);

    if (!file) throw new Error("File not found.");

    return res.status(200).json(file).end();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }

    return res.status(500).end();
  }
}

export const createNewFile = async (req: Request, res: Response) => {
  try {
    // TODO: zod validation
    const { name, expirationHours } = req.body as CreateFileDto;

    if (!name) throw new Error("Property \"name\" is required.");
    if (!expirationHours) throw new Error("Property \"expirationHours\" is required.");

    const fs = new FileService();

    const createdFile = await fs.createNewFile(name, expirationHours);

    const createdFileDto: OutputFileDto = {
      id: createdFile.id,
      name: createdFile.name,
      path: createdFile.path,
      createdAt: createdFile.createdAt.toISOString(),
      expirationDate: createdFile.expirationDate.toISOString(),
    }

    return res.status(201).json(createdFileDto).end();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }

    return res.status(500).end();
  }
}
