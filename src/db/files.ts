import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  id: { type: String, required: true },
  path: { type: String, required: true }
});

export const FileModel = mongoose.model('File', FileSchema);

export const getFiles = () => FileModel.find();
export const getFileById = (id: string) => FileModel.findOne({ id });
export const createFile = (values: Record<string, any>) => new FileModel(values).save().then((file) => file.toObject());
export const deleteFileById = (id: string) => FileModel.findOneAndDelete({ id: id });
