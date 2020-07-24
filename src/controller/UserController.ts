import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const login = async (request: Request, response: Response) => {

  const { email, password } = request.body

  const user = await getRepository(User).find({
    where: {
      email
    }
  })

  if (user.length === 1) {

    if (await bcrypt.compare(password, user[0].password)) {

      const token = jwt.sign({ id: user[0].id }, process.env.APP_SECURITY, {
        expiresIn: '1d'
      })

      const data = {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        token,
      }

      return response.json(data)

    } else {
      return response.status(404).json({ message: 'User not found!' })
    }

  } else {
    return response.status(404).json({ message: 'User not found!' })
  }
}

export const listUser = async (request: Request, response: Response) => {

  const users = await getRepository(User).find();

  return response.json(users);
}

export const safeUser = async (request: Request, response: Response) => {

  const { name, email, password } = request.body;

  const passwordHash = await bcrypt.hash(password, 8);

  const user = await getRepository(User).save({
    name,
    email,
    password: passwordHash
  });

  return response.json(user);
}
