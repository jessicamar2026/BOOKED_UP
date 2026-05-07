import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { ClubMember } from './ClubMember.js';
import { User } from './User.js';

export type ClubVisibility = 'private' | 'public' | 'invite only';

@Entity()
export class Club {
  @PrimaryColumn('uuid')
  clubId: string;

  @BeforeInsert()
  generateId(): void {
    this.clubId = uuidv7();
  }

  @Column({ type: 'varchar', unique: true })
  clubName: string;

  @Column({ type: 'varchar', unique: true })
  joinCode: string;

  @ManyToOne(() => User, (user) => user.clubs, { nullable: true })
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  @Column({
    type: 'enum',
    enum: ['private', 'public', 'invite only'],
    default: 'private',
  })
  visibility: ClubVisibility;

  @Column({ type: 'int', default: 50 })
  maxMembers: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ClubMember, (member) => member.club, {
    cascade: true,
  })
  clubMembers: ClubMember[];
}
