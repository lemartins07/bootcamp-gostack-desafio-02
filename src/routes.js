import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// Rotas que precisam de autenticação
routes.post('/recipients', RecipientsController.store);

export default routes;
