import { Request, Response } from 'express';
import {
  addComment as addCommentService,
  getCommentsByPost as getCommentsByPostService,
} from '../models/CommentModel.js';

type AddCommentBody = {
  userId: string;
  postId: string;
  content: string;
};

type Params = {
  postId: string;
};

export const addComment = async (
  req: Request<{}, {}, AddCommentBody>,
  res: Response,
): Promise<void> => {
  try {
    const { userId, postId, content } = req.body;

    const result = await addCommentService(userId, postId, content);

    res.status(201).json(result);
  } catch (err: unknown) {
    res.status(500).json({
      error: err instanceof Error ? err.message : 'Internal error',
    });
  }
};

export const getCommentsByPost = async (req: Request<Params>, res: Response): Promise<void> => {
  try {
    const postId = req.params.postId;

    const result = await getCommentsByPostService(postId);

    res.json(result);
  } catch (err: unknown) {
    res.status(500).json({
      error: err instanceof Error ? err.message : 'Internal error',
    });
  }
};
