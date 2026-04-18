import { AppDataSource } from '../dataSource.js';
import { User } from '../entities/User.js';

const userRepository = AppDataSource.getRepository(User);

async function getAllUsers(): Promise<User[]> {
  return userRepository.find();
}

async function getUserById(userId: string): Promise<User | null> {
  return userRepository.findOne({ where: { userId } });
}

async function getUserByEmail(email: string): Promise<User | null> {
  return userRepository.findOne({ where: { email } });
}

async function addUser(
  firstName: string,
  lastName: string,
  email: string,
  passwordHash: string,
  displayName: string,
): Promise<User> {
  const newUser = new User();
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.email = email;
  newUser.passwordHash = passwordHash;
  newUser.displayName = displayName;

  return userRepository.save(newUser);
}

async function updateUserEmail(userId: string, newEmail: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { userId } });

  if (!user) {
    return null;
  }

  user.email = newEmail;
  return userRepository.save(user);
}

async function updateUserPassWord(userId: string, newPassword: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { userId } });

  if (!user) {
    return null;
  }

  user.passwordHash = newPassword;
  return userRepository.save(user);
}

async function updateUserFirstName(userId: string, newFirstName: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { userId } });

  if (!user) {
    return null;
  }

  user.firstName = newFirstName;
  return userRepository.save(user);
}

async function updateUserLastName(userId: string, newLastName: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { userId } });

  if (!user) {
    return null;
  }

  user.lastName = newLastName;
  return userRepository.save(user);
}

export {
  getAllUsers,
  addUser,
  getUserById,
  getUserByEmail,
  updateUserEmail,
  updateUserPassWord,
  updateUserFirstName,
  updateUserLastName,
};
