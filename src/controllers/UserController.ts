import argon2 from 'argon2';
import { Request, Response } from 'express';
import 'express-session';
import {
  addUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUserEmail,
  updateUserFirstName,
  updateUserPassword,
} from '../models/UserModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { RegistrationSchema } from '../validators/authValidator.js';
import {
  CreateUserSchema,
  LogInSchema,
  UpdateUserEmailSchema,
  UpdateUserFirstNameSchema,
  UpdateUserLastNameSchema,
  UpdateUserPasswordSchema,
} from '../validators/UserValidator.js';

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
  const { userId } = req.params;

  const result = UpdateUserEmailSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  try {
    const updatedUser = await updateUserEmail(userId, result.data.email);
    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ user: updatedUser });
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function updatedUserPassword(req: Request<{ userId: string }>, res: Response): Promise<void> {
  try {
    const userId = req.params.userId;

    const result = UpdateUserPasswordSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json(result.error.flatten());
      return;
    }

    const { password } = result.data;

    const passwordHash = await argon2.hash(password);

    const updatedUserPassword = await updateUserPassword(userId, passwordHash);

    if (!updatedUserPassword) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(updatedUserPassword);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function updatedUserFirstName(
  req: Request<{ userId: string }>,
  res: Response,
): Promise<void> {
  try {
    const userId = req.params.userId;

    const result = UpdateUserFirstNameSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json(result.error.flatten());
      return;
    }

    const { firstName } = result.data;

    const updatedUserFirstName = await updateUserFirstName(userId, firstName);

    if (!updatedUserFirstName) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(updatedUserFirstName);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function updatedUserLastName(req: Request<{ userId: string }>, res: Response): Promise<void> {
  try {
    const userId = req.params.userId;

    const result = UpdateUserLastNameSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json(result.error.flatten());
      return;
    }

    const { lastName } = result.data;

    const updatedUserLastName = await updateUserFirstName(userId, lastName);

    if (!updatedUserLastName) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(updatedUserLastName);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export {
  createUser,
  getUserByTheEmail,
  getUserByTheId,
  getUsers,
  logIn,
  logOut,
  registerUser,
  updatedUserEmail,
  updatedUserFirstName,
  updatedUserLastName,
  updatedUserPassword,
};
