import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Book } from './entities/Book.js';
import { Club } from './entities/Club.js';
import { ClubMember } from './entities/ClubMember.js';
import { Comment } from './entities/Comment.js';
import { DiscussionPost } from './entities/DiscussionPost.js';
import { ReadingProgress } from './entities/ReadingProgress.js';
import { Review } from './entities/Review.js';
import { User } from './entities/User.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: true,
  logging: false,

  entities: [User, Book, Club, ClubMember, DiscussionPost, Comment, Review, ReadingProgress],
});
