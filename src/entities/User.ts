import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Club } from './Club.js';
import { ClubMember } from './ClubMember.js';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  userId: string;

  @BeforeInsert()
  generateId(): void {
    this.userId = uuidv7();
  }

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  passwordHash: string;

  @Column({ type: 'varchar' })
  displayName: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user',
  })
  role: 'admin' | 'user';

  @OneToMany(() => Club, (club) => club.createdByUser)
  clubs: Club[];

  @OneToMany(() => ClubMember, (member) => member.user)
  memberships: ClubMember[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLoggedIn: Date;
}
