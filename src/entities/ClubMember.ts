import { Entity, PrimaryColumn, Column, BeforeInsert, CreateDateColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity()
export class ClubMember {
  @PrimaryColumn()
  clubMemberId: string;

  @BeforeInsert()
  generateId(): void {
    this.clubMemberId = uuidv7();
  }

  @Column()
  userId: string;

  @Column()
  role: 'admin' | 'user';

  @CreateDateColumn()
  joinedAt: Date;
}
