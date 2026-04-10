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

async function addUser(email: string, passwordHash: string): Promise<User> {
  const newUser = new User();
  newUser.email = email;
  newUser.passwordHash = passwordHash;

  return userRepository.save(newUser);
}

export { addUser, getAllUsers, getUserById, getUserByEmail };
