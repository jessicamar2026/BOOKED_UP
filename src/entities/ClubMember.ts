import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
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
  role: 'admin' | 'non-admin';

  @CreateDateColumn()
  joinedAt: Date;
}
