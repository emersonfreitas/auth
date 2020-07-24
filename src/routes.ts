import { Router, Request, Response } from 'express';
import { listUser, safeUser, login } from './controller/UserController';

import { auth } from './middlewares/auth'

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello Softcado JWT' });
});

routes.post('/session', login);

routes.use(auth);

routes.get('/users', listUser);
routes.post('/users', safeUser);

export default routes;
