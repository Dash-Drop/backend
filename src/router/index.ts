import { Router } from 'express';

import files from './files';

const router = Router();

export default (): Router => {
  files(router);

  return router;
}
