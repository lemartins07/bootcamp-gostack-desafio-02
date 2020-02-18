import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/recipients', RecipientsController.store);

export default routes;
