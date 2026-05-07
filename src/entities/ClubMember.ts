import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Club } from './Club.js';
import { User } from './User.js';

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

  @ManyToOne(() => Club, (club) => club.clubMembers)
  club: Relation<Club>;

  @ManyToOne(() => User, (user) => user.memberships)
  user: User;
}
