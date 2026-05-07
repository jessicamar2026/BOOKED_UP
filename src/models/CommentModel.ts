import { AppDataSource } from '../dataSource.js';
import { Comment } from '../entities/Comment.js';
import { DiscussionPost } from '../entities/DiscussionPost.js';
import { User } from '../entities/User.js';

const commentRepo = AppDataSource.getRepository(Comment);
const userRepo = AppDataSource.getRepository(User);
const postRepo = AppDataSource.getRepository(DiscussionPost);

export async function addComment(
  userId: string,
  postId: string,
  content: string,
): Promise<Comment> {
  const user = await userRepo.findOne({ where: { userId } });
  const post = await postRepo.findOne({ where: { postId } });

  if (!user || !post) {
    throw new Error('User or Post not found');
  }

  const comment = commentRepo.create({
    user,
    post,
    content,
  });

  return commentRepo.save(comment);
}

export async function getCommentsByPost(postId: string): Promise<Comment[]> {
  return commentRepo.find({
    where: {
      post: { postId },
    },
    relations: ['user', 'post'],
  });
}
