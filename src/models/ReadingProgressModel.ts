import { AppDataSource } from '../dataSource.js';
import { Book } from '../entities/Book.js';
import { ReadingProgress } from '../entities/ReadingProgress.js';
import { User } from '../entities/User.js';

const repo = AppDataSource.getRepository(ReadingProgress);
const userRepo = AppDataSource.getRepository(User);
const bookRepo = AppDataSource.getRepository(Book);

export async function addProgress(
  userId: string,
  bookId: string,
  pagesRead: number,
  progressPercent: number,
  status: string,
  lastUpdatedAt: Date,
): Promise<ReadingProgress> {
  const user = await userRepo.findOne({ where: { userId } });
  const book = await bookRepo.findOne({ where: { bookId } });

  if (!user || !book) {
    throw new Error('User or Book not found');
  }

  const progress = new ReadingProgress();

  progress.user = user;
  progress.book = book;
  progress.pagesRead = pagesRead;
  progress.progressPercent = progressPercent;
  progress.status = status;
  progress.lastUpdatedAt = lastUpdatedAt;

  return repo.save(progress);
}

export async function getProgressByUser(userId: string): Promise<ReadingProgress[]> {
  return repo.find({
    where: {
      user: { userId },
    },
    relations: ['book', 'user'],
  });
}
