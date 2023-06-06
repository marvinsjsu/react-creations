import { body, param } from 'express-validator';

import { errorValidator } from './error';

export const postValidator = [
  body('title').isString(),
  body('content').isString(),
  body('summary').isString(),
  errorValidator,
];

export const postPostValidator = [
  ...postValidator,
];

export const postPutValidator = [
  param('id').isString(),
  ...postValidator,
];
