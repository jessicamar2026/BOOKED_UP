import { Request, Response } from 'express';
import argon2 from 'argon2';
import { RegistrationSchema } from '../validators/authValidator.js';
import { CreateUserSchema } from '../validators/UserValidator.js';
import { addUser, getUserByEmail } from '../models/UserModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';

async function registerUser(req: Request, res: Response): Promise<void> {
  const result = RegistrationSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { email, password } = result.data;

  try {
    const passwordHash = await argon2.hash(password);
    const newUser = await addUser(email, passwordHash);
    console.log(newUser);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function logIn(req: Request, res: Response): Promise<void> {
  const result = RegistrationSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  const { email, password } = result.data;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.sendStatus(403);
      return;
    }

    const { passwordHash } = user;
    if (!(await argon2.verify(passwordHash, password))) {
      res.sendStatus(403);
      return;
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function createUser(req: Request, res: Response): Promise<void> {
  const result = CreateUserSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const { email, passwordHash } = result.data;
  const newUser = await addUser(email, passwordHash);
  console.log(newUser);
  res.status(201).json({ todo: newUser });
}

export { registerUser, logIn, createUser };
