import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  ManyToMany,
  Relation,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { ClubMember } from './ClubMember.js';

export type ClubVisibility = 'private' | 'public' | 'invite only';

@Entity()
export class Club {
  @PrimaryColumn()
  clubId: string;

  @BeforeInsert()
  generateId(): void {
    this.clubId = uuidv7();
  }

  @Column({ unique: true })
  clubName: string;

  @Column({ unique: true })
  joinCode: string;

  @Column()
  createdByUser: string;

  @Column()
  visibility: ClubVisibility;

  @Column()
  maxMembers: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => ClubMember, (clubMember) => clubMember.clubs)
  clubMembers: Relation<ClubMember>[];
}
