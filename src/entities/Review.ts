import { BeforeInsert, Check, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Book } from './Book.js';
import { User } from './User.js';

@Entity()
@Check(`"rating" >= 1 AND "rating" <= 5`)
export class Review {
  @PrimaryColumn('uuid')
  reviewId: string;

  @BeforeInsert()
  generateId() {
    this.reviewId = uuidv7();
  }

  @ManyToOne(() => Book)
  book: Book;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text' })
  comment: string;
}
