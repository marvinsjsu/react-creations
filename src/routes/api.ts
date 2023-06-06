import { Router } from 'express';

import {
  postPostValidator,
  postPutValidator,
} from '../middlewares/validators/post';
import {
  postGetHandler,
  postGetWithIdHandler,
  postPostHandler,
  postPutHandler,
  postDeleteHandler,
} from '../handlers/post';


const router = Router();

/**
 * Post
 */
router.get('/post', postGetHandler);
router.get('/post/:id', postGetWithIdHandler);
router.post('/post', postPostValidator, postPostHandler);
router.put('/post/:id', postPutValidator, postPutHandler);
router.delete('/post/:id', postDeleteHandler);


export default router;
