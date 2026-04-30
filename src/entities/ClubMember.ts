import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  ManyToMany,
  Relation,
  JoinTable,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Club } from './Club.js';

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

  @ManyToMany(() => Club, (club) => club.clubMembers, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  clubs: Relation<Club>[];
}
