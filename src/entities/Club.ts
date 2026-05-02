import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { ClubMember } from './ClubMember.js';
import { User } from './User.js';

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

  @ManyToOne(() => User, (user) => user.clubs, { nullable: true })
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  @Column()
  visibility: ClubVisibility;

  @Column({ default: 50 })
  maxMembers: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ClubMember, (member) => member.club, {
    cascade: true,
  })
  clubMembers: ClubMember[];
}
