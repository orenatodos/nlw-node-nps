import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import * as Yup from 'yup';

import User from '../models/User';

import AppError from '../errors/AppError';

class UsersController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    // if (!(await schema.isValid(request.body))) {
    //   return response.status(400).json({ error: 'Validation Failed!' });
    // }

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }

    const usersRepository = getRepository(User);

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export default new UsersController();
