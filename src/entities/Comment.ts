import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { DiscussionPost } from './DiscussionPost.js';
import { User } from './User.js';

@Entity()
export class Comment {
  @PrimaryColumn('uuid')
  commentId: string;

  @BeforeInsert()
  generateId() {
    this.commentId = uuidv7();
  }

  @ManyToOne(() => DiscussionPost)
  post: DiscussionPost;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
