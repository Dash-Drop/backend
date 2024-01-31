import { Router } from 'express';
import { getAll, getFile, createNewFile, donwloadFile } from '../controllers/files';

const BASE_PATH = "/files"

export default (router: Router) => {
  router.get(BASE_PATH, getAll);
  router.get(`${BASE_PATH}/:id`, getFile);
  router.post(BASE_PATH, createNewFile);
  router.get(`${BASE_PATH}/download/:id`, donwloadFile);
}
