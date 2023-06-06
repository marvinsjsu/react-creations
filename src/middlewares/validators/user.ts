import { body } from 'express-validator';

import { errorValidator } from './error';

export const userBaseValidator = [
  body('username').isString(),
  body('email').isString(),
  errorValidator,
];

export const userRegistrationValidator = [
  body('firstName').isString(),
  body('email').isString(),
  errorValidator,
];

export const userVerifyTokenValidator = [
  body('email').isString(),
  body('token').isString(),
  errorValidator,
];

export const userPostValidator = [
  body('firstName').isString(),
  body('password').isString(),
  body('username').isString(),
  body('lastName').isString(),
  body('zipCode').isString(),
  body('email').isString(),
  errorValidator,
];
