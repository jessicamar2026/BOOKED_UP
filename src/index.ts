import dotenv from 'dotenv';
import express, { Express } from 'express';
import 'reflect-metadata';
import './config.js';
import {
  createBook,
  deleteBookController,
  getBook,
  getBooks,
  updateBookController,
} from './controllers/bookControllers.js';

dotenv.config();

import { createPost, getPostsByBook } from './controllers/DiscussionPostController.js';

import { addComment, getCommentsByPost } from './controllers/CommentController.js';

import { addReview, getReviewsByBook } from './controllers/ReviewController.js';

import { addProgress, getProgressByUser } from './controllers/ReadingProgressController.js';
import { AppDataSource } from './dataSource.js';

await AppDataSource.initialize();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Books
app.get('/books', getBooks);
app.get('/books/:bookId', getBook);
app.post('/books', createBook);
app.patch('/books/:bookId', updateBookController);
app.delete('/books/:bookId', deleteBookController);

// ReadingProgress
app.post('/progress', addProgress);
app.get('/progress/:userId', getProgressByUser);

// Posts
app.post('/posts', createPost);
app.get('/posts/:bookId', getPostsByBook);

// Comments
app.post('/comments', addComment);
app.get('/comments/:postId', getCommentsByPost);

// Reviews
app.post('/reviews', addReview);
app.get('/reviews/:bookId', getReviewsByBook);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
