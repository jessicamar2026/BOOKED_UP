import dotenv from 'dotenv';
import express, { Express } from 'express';
import 'reflect-metadata';
import './config.js';
import {
<<<<<<< HEAD
  createClub,
  getClubByCreator,
  getClubByTheCreatedDate,
  getClubByTheId,
  getClubByTheMaxMembers,
  getClubByTheName,
  getClubByTheVisibility,
  getClubs,
  joinClub,
  updatedClubJoinCode,
  updatedClubMaxMembers,
  updatedClubName,
  updatedClubVisibility,
} from './controllers/ClubController.js';
import {
  createClubMember,
  getClubMemberByTheId,
  getClubMemberByTheRole,
  getClubMembers,
  updatedClubMemberRole,
} from './controllers/ClubMemberController.js';
import {
  createUser,
  getMe,
  getUserByTheEmail,
  getUserByTheId,
  getUsers,
  logIn,
  logOut,
  registerUser,
  updatedUserEmail,
  updatedUserFirstName,
  updatedUserLastName,
  updatedUserPassword,
} from './controllers/UserController.js';
import { sessionMiddleware } from './sessionConfig.js';
=======
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
>>>>>>> f4600399df322b8246e423d0243972c9efaeeb77

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Books
app.get('/books', getBooks);
app.get('/books/:bookId', getBook);
app.post('/books', createBook);
app.patch('/books/:bookId', updateBookController);
app.delete('/books/:bookId', deleteBookController);

<<<<<<< HEAD
// Setup static resource file middleware
// This allows the client to access any file inside the `public` directory
// Only put file that you actually want to be publicly accessibly in the `public` folder
app.use(express.static('public', { extensions: ['html'] }));
app.use(express.static('frontend/build'));
=======
// ReadingProgress
app.post('/progress', addProgress);
app.get('/progress/:userId', getProgressByUser);
>>>>>>> f4600399df322b8246e423d0243972c9efaeeb77

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
