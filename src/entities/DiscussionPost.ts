import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Book } from './Book.js';
import { User } from './User.js';

@Entity()
export class DiscussionPost {
  @PrimaryColumn('uuid')
  postId: string;

  @BeforeInsert()
  generateId() {
    this.postId = uuidv7();
  }

  @ManyToOne(() => Book)
  book: Book;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'boolean', default: false })
  spoilerFlag: boolean;

  @Column({ type: 'int' })
  chapter: number;

  @CreateDateColumn()
  createdAt: Date;
}
