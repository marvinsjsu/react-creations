import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { protect } from './src/modules/auth';
import api from './src/routes/api';
import { postGetHandler } from './src/handlers/post';
import {
  signin,
  registerUser,
  createNewUser,
  userVerifyToken,
  userRegistrationReset,
} from './src/handlers/user';
import {
  userPostValidator,
  userVerifyTokenValidator,
  userRegistrationValidator,
} from './src/middlewares/validators/user';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', protect, api);

app.get('/posts', postGetHandler);

app.post('/register/reset', userRegistrationValidator, userRegistrationReset);
app.post('/verify', userVerifyTokenValidator, userVerifyToken);
app.post('/register', userRegistrationValidator, registerUser);
app.post('/user', userPostValidator, createNewUser);
app.post('/signin', signin);

export default app;
