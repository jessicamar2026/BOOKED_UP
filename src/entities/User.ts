import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Club } from './Club.js';
import { ClubMember } from './ClubMember.js';

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

  @Column({ default: 'user' })
  role: 'admin' | 'user';

  @OneToMany(() => Club, (club) => club.createdByUser)
  clubs: Club[];

  @OneToMany(() => ClubMember, (member) => member.user)
  memberships: ClubMember[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  lastLoggedIn: Date;
}
