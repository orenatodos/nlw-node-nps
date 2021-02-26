import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Survey from '../models/Survey';

class SurveysController {
  async show(request: Request, response: Response) {
    const surveysRepository = getRepository(Survey);

    const surveys = await surveysRepository.find();

    return response.json(surveys);
  }

  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveysRepository = getRepository(Survey);

    const survey = surveysRepository.create({
      title,
      description,
    });

    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  }
}

export default new SurveysController();
