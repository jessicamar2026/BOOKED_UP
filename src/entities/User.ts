import { Entity, PrimaryColumn, Column, BeforeInsert, CreateDateColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity()
export class User {
  @PrimaryColumn()
  userId: string;

  @BeforeInsert()
  generateId(): void {
    this.userId = uuidv7();
  }

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  displayName: string;

  @Column()
  role: 'admin' | 'user';

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  lastLoggedIn: Date;
}
