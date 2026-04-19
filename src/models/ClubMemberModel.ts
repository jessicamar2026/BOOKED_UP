import { AppDataSource } from '../dataSource.js';
import { ClubMember, ClubRole } from '../entities/ClubMember.js';

const clubMemberRepository = AppDataSource.getRepository(ClubMember);

async function getAllClubMembers(): Promise<ClubMember[]> {
  return clubMemberRepository.find();
}

async function getClubMemberById(clubMemberId: string): Promise<ClubMember | null> {
  return clubMemberRepository.findOne({ where: { clubMemberId } });
}

async function getClubMemberByRole(role: ClubRole): Promise<ClubMember | null> {
  return clubMemberRepository.findOne({ where: { role } });
}

async function addClubMember(clubMemberId: string, role: ClubRole): Promise<ClubMember> {
  const newClubMember = new ClubMember();
  newClubMember.clubMemberId = clubMemberId;
  newClubMember.role = role;

  return clubMemberRepository.save(newClubMember);
}

async function updateClubMemberRole(
  clubMemberId: string,
  newRole: ClubRole,
): Promise<ClubMember | null> {
  const clubMember = await clubMemberRepository.findOne({ where: { clubMemberId } });

  if (!clubMember) {
    return null;
  }

  clubMember.role = newRole;
  return clubMemberRepository.save(clubMember);
}

export {
  getAllClubMembers,
  getClubMemberById,
  getClubMemberByRole,
  addClubMember,
  updateClubMemberRole,
};
