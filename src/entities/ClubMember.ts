import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

export type ClubRole = 'admin' | 'non-admin';

@Entity()
export class ClubMember {
  @PrimaryColumn()
  clubMemberId: string;

  @BeforeInsert()
  generateId(): void {
    this.clubMemberId = uuidv7();
  }

  @Column()
  role: ClubRole;

  @CreateDateColumn()
  joinedAt: Date;
}
