import { Router } from 'express';

import npsController from '../controllers/NpsController';

const npsRouter = Router();

npsRouter.get('/:survey_id', npsController.execute);

export default npsRouter;
