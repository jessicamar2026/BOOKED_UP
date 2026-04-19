import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

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
}
