import { Router } from 'express';
import { getAll, getFile, createNewFile } from '../controllers/files';

const BASE_PATH = "/files"

export default (router: Router) => {
  router.get(BASE_PATH, getAll);
  router.get(`${BASE_PATH}/:id`, getFile);
  router.post(BASE_PATH, createNewFile);
}
