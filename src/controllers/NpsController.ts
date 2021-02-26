import { Request, Response } from 'express';
import { getRepository, Not, IsNull } from 'typeorm';

import SurveyUser from '../models/SurveyUser';

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveysUsersRepository = getRepository(SurveyUser);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractors = surveysUsers.filter(
      survey => survey.value >= 0 && survey.value <= 6,
    ).length;

    const liabilities = surveysUsers.filter(
      survey => survey.value >= 7 && survey.value <= 8,
    ).length;

    const promoters = surveysUsers.filter(
      survey => survey.value >= 9 && survey.value <= 10,
    ).length;

    const totalAnswers = surveysUsers.length;

    const calculate = Number(
      (((promoters - detractors) / totalAnswers) * 100).toFixed(2),
    );

    return response.json({
      detractors,
      liabilities,
      promoters,
      totalAnswers,
      nps: calculate,
    });
  }
}

export default new NpsController();
