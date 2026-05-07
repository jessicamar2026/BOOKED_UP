import { AppDataSource } from '../dataSource.js';
import { Book } from '../entities/Book.js';
import { Review } from '../entities/Review.js';
import { User } from '../entities/User.js';

const repo = AppDataSource.getRepository(Review);

export const addReview = async (
  userId: string,
  bookId: string,
  rating: number,
  comment: string,
): Promise<Review> => {
  const user = await AppDataSource.getRepository(User).findOne({
    where: { userId },
  });

  const book = await AppDataSource.getRepository(Book).findOne({
    where: { bookId },
  });

  if (!user || !book) {
    throw new Error('User or Book not found');
  }

  const review = repo.create({
    user,
    book,
    rating,
    comment,
  });

  return repo.save(review);
};

export const getReviewsByBook = async (bookId: string): Promise<Review[]> => {
  return repo.find({
    where: { book: { bookId } },
    relations: ['user'],
  });
};
