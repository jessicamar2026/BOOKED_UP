import { BeforeInsert, Check, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Book } from './Book.js';
import { User } from './User.js';

@Entity()
@Check(`"pagesRead" >= 0`)
export class ReadingProgress {
  @PrimaryColumn('uuid')
  progressId: string;

  @BeforeInsert()
  generateId() {
    this.progressId = uuidv7();
  }

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Book)
  book: Book;

  @Column({ type: 'int' })
  pagesRead: number;

  @Column({ type: 'float' })
  progressPercent: number;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'timestamp' })
  lastUpdatedAt: Date;
}
