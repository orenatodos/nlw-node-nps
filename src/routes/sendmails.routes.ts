import { Router } from 'express';

import sendMailsController from '../controllers/SendMailsController';

const sendMailsRouter = Router();

sendMailsRouter.post('/', sendMailsController.execute);

export default sendMailsRouter;
