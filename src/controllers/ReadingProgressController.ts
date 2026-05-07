import { Request, Response } from 'express';
import {
  addProgress as addProgressService,
  getProgressByUser as getProgressByUserService,
} from '../models/ReadingProgressModel.js';

type AddProgressBody = {
  userId: string;
  bookId: string;
  pagesRead: number;
  progressPercent: number;
  status: string;
  lastUpdatedAt: string;
};

type Params = {
  userId: string;
};

export const addProgress = async (
  req: Request<{}, {}, AddProgressBody>,
  res: Response,
): Promise<void> => {
  try {
    const { userId, bookId, pagesRead, progressPercent, status, lastUpdatedAt } = req.body;

    const result = await addProgressService(
      userId,
      bookId,
      pagesRead,
      progressPercent,
      status,
      new Date(lastUpdatedAt),
    );

    res.status(201).json(result);
  } catch (err: unknown) {
    res.status(500).json({
      error: err instanceof Error ? err.message : 'Internal error',
    });
  }
};

export const getProgressByUser = async (req: Request<Params>, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;

    const result = await getProgressByUserService(userId);

    res.json(result);
  } catch (err: unknown) {
    res.status(500).json({
      error: err instanceof Error ? err.message : 'Internal error',
    });
  }
};
