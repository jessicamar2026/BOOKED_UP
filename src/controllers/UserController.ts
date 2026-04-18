import { Request, Response } from 'express';
import argon2 from 'argon2';
import { RegistrationSchema } from '../validators/authValidator.js';
import {
  CreateUserSchema,
  UpdateUserEmailSchema,
  LogInSchema,
} from '../validators/UserValidator.js';
import {
  getUserById,
  addUser,
  getUserByEmail,
  getAllUsers,
  updateUserEmail,
} from '../models/UserModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import 'express-session';

async function getUsers(req: Request, res: Response): Promise<void> {
  const users = await getAllUsers();
  res.json({ users });
}

async function getUserByTheId(req: Request<{ userId: string }>, res: Response): Promise<void> {
  const { userId } = req.params;
  const user = await getUserById(userId);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json({ user });
}

async function getUserByTheEmail(req: Request<{ email: string }>, res: Response): Promise<void> {
  const { email } = req.params;
  const user = await getUserByEmail(email);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json({ user });
}

async function registerUser(req: Request, res: Response): Promise<void> {
  const result = RegistrationSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { firstName, lastName, email, password, displayName } = result.data;

  try {
    const passwordHash = await argon2.hash(password);
    const newUser = await addUser(firstName, lastName, email, passwordHash, displayName);
    console.log(newUser);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function createUser(req: Request, res: Response): Promise<void> {
  const result = CreateUserSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const { firstName, lastName, email, passwordHash, displayName } = result.data;
  const newUser = await addUser(firstName, lastName, email, passwordHash, displayName);
  console.log(newUser);
  res.status(201).json({ todo: newUser });
}

async function logIn(req: Request, res: Response): Promise<void> {
  const result = LogInSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { email, password } = result.data;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      req.session.logInAttempts = (req.session.logInAttempts ?? 0) + 1;
      res.sendStatus(403);
      return;
    }

    if (!(await argon2.verify(user.passwordHash, password))) {
      req.session.logInAttempts = (req.session.logInAttempts ?? 0) + 1;
      res.sendStatus(403);
      return;
    }

    await req.session.clearSession();
    req.session.authenticatedUser = {
      displayName: user.displayName,
      userId: user.userId,
      email: user.email,
    };
    req.session.isLoggedIn = true;

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function logOut(req: Request, res: Response): Promise<void> {
  await req.session.clearSession();
  res.sendStatus(204);
}

async function updatedUserEmail(req: Request<{ userId: string }>, res: Response): Promise<void> {
  try {
    const userId = req.params.userId;

    const parsed = UpdateUserEmailSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json(parsed.error.flatten());
      return;
    }

    const { email } = parsed.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: 'Email in use' });
      return;
    }

    const updatedUserEmail = await updateUserEmail(userId, email);

    if (!updatedUserEmail) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(updatedUserEmail);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export {
  getUsers,
  getUserByTheId,
  getUserByTheEmail,
  registerUser,
  createUser,
  logIn,
  logOut,
  updatedUserEmail,
};
