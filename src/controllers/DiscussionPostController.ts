import { Request, Response } from 'express';
import {
  createPost as createPostService,
  getPostsByBook as getPostsByBookService,
} from '../models/DiscussionPostModel.js';

type CreatePostBody = {
  userId: string;
  bookId: string;
  title: string;
  content: string;
  spoilerFlag: boolean;
  chapter: number;
};

type Params = {
  bookId: string;
};

export const createPost = async (
  req: Request<{}, {}, CreatePostBody>,
  res: Response,
): Promise<void> => {
  try {
    const { userId, bookId, title, content, spoilerFlag, chapter } = req.body;

    const result = await createPostService(userId, bookId, title, content, spoilerFlag, chapter);

    res.status(201).json(result);
  } catch (err: unknown) {
    res.status(500).json({
      error: err instanceof Error ? err.message : 'Internal error',
    });
  }
};

export const getPostsByBook = async (req: Request<Params>, res: Response): Promise<void> => {
  try {
    const bookId = req.params.bookId;

    const result = await getPostsByBookService(bookId);

    res.json(result);
  } catch (err: unknown) {
    res.status(500).json({
      error: err instanceof Error ? err.message : 'Internal error',
    });
  }
};
