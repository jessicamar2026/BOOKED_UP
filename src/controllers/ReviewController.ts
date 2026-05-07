import { Request, Response } from 'express';
import {
  addReview as addReviewService,
  getReviewsByBook as getReviewsByBookService,
} from '../models/ReviewModel.js';

type AddReviewBody = {
  userId: string;
  bookId: string;
  rating: number;
  comment: string;
};

type Params = {
  bookId: string;
};

export const addReview = async (
  req: Request<{}, {}, AddReviewBody>,
  res: Response,
): Promise<void> => {
  try {
    const { userId, bookId, rating, comment } = req.body;

    const result = await addReviewService(userId, bookId, rating, comment);

    res.status(201).json(result);
  } catch (err: unknown) {
    res.status(500).json({
      error: err instanceof Error ? err.message : 'Internal error',
    });
  }
};

export const getReviewsByBook = async (req: Request<Params>, res: Response): Promise<void> => {
  try {
    const bookId = req.params.bookId;

    const result = await getReviewsByBookService(bookId);

    res.json(result);
  } catch (err: unknown) {
    res.status(500).json({
      error: err instanceof Error ? err.message : 'Internal error',
    });
  }
};
