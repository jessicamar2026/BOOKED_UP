import { AppDataSource } from '../dataSource.js';
import { ClubMember } from '../entities/ClubMember.js';

const clubMemberRepository = AppDataSource.getRepository(ClubMember);

async function getAllClubMembers(): Promise<ClubMember[]> {
  return clubMemberRepository.find();
}

async function getClubMembersById(clubMemberId: string): Promise<ClubMember | null> {
  return clubMemberRepository.findOne({ where: { clubMemberId } });
}

export { getAllClubMembers, getClubMembersById };
