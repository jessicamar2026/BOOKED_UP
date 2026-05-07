import { AppDataSource } from '../dataSource.js';
import { Book } from '../entities/Book.js';
import { DiscussionPost } from '../entities/DiscussionPost.js';
import { User } from '../entities/User.js';

const postRepo = AppDataSource.getRepository(DiscussionPost);
const userRepo = AppDataSource.getRepository(User);
const bookRepo = AppDataSource.getRepository(Book);

// CREATE POST
export async function createPost(
  userId: string,
  bookId: string,
  title: string,
  content: string,
  spoilerFlag: boolean,
  chapter: number,
): Promise<DiscussionPost> {
  const user = await userRepo.findOne({ where: { userId } });
  const book = await bookRepo.findOne({ where: { bookId } });

  if (!user || !book) {
    throw new Error('User or Book not found');
  }

  const post = postRepo.create({
    user,
    book,
    title,
    content,
    spoilerFlag,
    chapter,
  });

  return postRepo.save(post);
}

export async function getPostsByBook(bookId: string): Promise<DiscussionPost[]> {
  return postRepo.find({
    where: {
      book: { bookId },
    },
    relations: ['user', 'book'],
  });
}
