import { Router } from 'express';

import usersRouter from './users.routes';
import surveysRouter from './surveys.routes';
import sendMailsRouter from './sendmails.routes';
import answersRouter from './answers.routes';
import npsRouter from './nps.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/surveys', surveysRouter);
routes.use('/send-mails', sendMailsRouter);
routes.use('/answers', answersRouter);
routes.use('/nps', npsRouter);

export default routes;
