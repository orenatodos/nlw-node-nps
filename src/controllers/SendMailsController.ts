import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import path from 'path';

import User from '../models/User';
import Survey from '../models/Survey';
import SurveyUser from '../models/SurveyUser';

import SendMailsService from '../services/SendMailsService';

import AppError from '../errors/AppError';

class SendMailsController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getRepository(User);
    const surveysRepository = getRepository(Survey);
    const surveysUsersRepository = getRepository(SurveyUser);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError('User does not exists');
    }

    const survey = await surveysRepository.findOne({ id: survey_id });

    if (!survey) {
      throw new AppError('Survey does not exists');
    }

    const sendMail = new SendMailsService();

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: user.id, survey_id: survey.id },
      relations: ['user', 'survey'],
    });

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: '',
      link: process.env.URL_MAIL,
    };

    const npsPath = path.resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'npsMail.hbs',
    );

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;

      await sendMail.execute({
        pathFile: npsPath,
        variables,
        to: email,
        subject: survey.title,
      });

      return response.json(surveyUserAlreadyExists);
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);

    variables.id = surveyUser.id;

    await sendMail.execute({
      pathFile: npsPath,
      variables,
      to: email,
      subject: survey.title,
    });

    return response.status(201).json(surveyUser);
  }
}

export default new SendMailsController();
