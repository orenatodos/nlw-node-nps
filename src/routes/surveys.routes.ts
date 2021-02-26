import { Router } from 'express';

import surveysController from '../controllers/SurveysController';

const surveysRouter = Router();

surveysRouter.get('/', surveysController.show);
surveysRouter.post('/', surveysController.create);

export default surveysRouter;
