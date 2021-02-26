import { Router } from 'express';

import answerController from '../controllers/AnswersController';

const answersRouter = Router();

answersRouter.get('/:value', answerController.execute);

export default answersRouter;
