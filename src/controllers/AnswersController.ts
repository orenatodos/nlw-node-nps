import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import SurveyUser from '../models/SurveyUser';
import AppError from '../errors/AppError';

class AnswersController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    console.log('value: ', value, 'u: ', u);

    const surveysUsersRepository = getRepository(SurveyUser);

    const surveyUser = await surveysUsersRepository.findOne({ id: String(u) });

    if (!surveyUser) {
      throw new AppError('Survey User does not exists');
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export default new AnswersController();
