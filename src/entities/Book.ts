import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

import { v7 as uuidv7 } from 'uuid';

@Entity()
export class Book {
  @PrimaryColumn('uuid')
  bookId: string;

  @BeforeInsert()
  generateId(): void {
    this.bookId = uuidv7();
  }

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  author: string;

  @Column({ type: 'int' })
  pageCount: number;

  @Column({ type: 'text', nullable: true })
  genre: string;

  @Column({ type: 'text', nullable: true })
  coverImageURL: string;

  @Column({ type: 'int', nullable: true })
  publishedYear: number;

  @Column({ type: 'int', default: 0 })
  averageRating: number;

  @CreateDateColumn()
  createdAt: Date;
}
