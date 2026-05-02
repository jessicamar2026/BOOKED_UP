import { AppDataSource } from '../dataSource.js';
import { Club, ClubVisibility } from '../entities/Club.js';
import { ClubMember } from '../entities/ClubMember.js';
import { clubMemberRepository } from '../models/ClubMemberModel.js';
import { User } from '../entities/User.js';

const clubRepository = AppDataSource.getRepository(Club);

async function getAllClubs(): Promise<Club[]> {
  return clubRepository.find();
}

async function getClubById(clubId: string): Promise<Club | null> {
  return clubRepository.findOne({ where: { clubId } });
}

async function getClubByClubName(clubName: string): Promise<Club | null> {
  return clubRepository.findOne({ where: { clubName } });
}

async function getClubByCreatedUser(createdByUserId: string): Promise<Club[]> {
  return clubRepository.find({ where: { createdByUser: { userId: createdByUserId } } });
}

async function getClubByVisibility(visibility: ClubVisibility): Promise<Club[]> {
  return clubRepository.find({ where: { visibility } });
}

async function getClubByMaxMembers(maxMembers: number): Promise<Club[]> {
  return clubRepository.find({ where: { maxMembers } });
}

async function getClubByCreatedDate(createdAt: Date): Promise<Club[]> {
  return clubRepository.find({ where: { createdAt } });
}

async function addClub(
  clubName: string,
  joinCode: string,
  createdByUserId: string,
  visibility: ClubVisibility,
  maxMembers: number,
): Promise<Club> {
  const newClub = new Club();
  newClub.clubName = clubName;
  newClub.joinCode = joinCode;
  newClub.createdByUser = { userId: createdByUserId } as User;
  newClub.visibility = visibility;
  newClub.maxMembers = maxMembers;

  return clubRepository.save(newClub);
}

async function updateClubName(clubId: string, newName: string): Promise<Club | null> {
  const club = await clubRepository.findOne({ where: { clubId } });

  if (!club) {
    return null;
  }

  club.clubName = newName;
  return clubRepository.save(club);
}

async function updateJoinCode(clubId: string, newJoinCode: string): Promise<Club | null> {
  const club = await clubRepository.findOne({ where: { clubId } });

  if (!club) {
    return null;
  }

  club.joinCode = newJoinCode;
  return clubRepository.save(club);
}

async function updateVisibility(
  clubId: string,
  newVisibility: ClubVisibility,
): Promise<Club | null> {
  const club = await clubRepository.findOne({ where: { clubId } });

  if (!club) {
    return null;
  }

  club.visibility = newVisibility;
  return clubRepository.save(club);
}

async function updateMaxMembers(clubId: string, newMax: number): Promise<Club | null> {
  const club = await clubRepository.findOne({ where: { clubId } });

  if (!club) {
    return null;
  }

  club.maxMembers = newMax;
  return clubRepository.save(club);
}

async function addClubWithMembers(
  clubName: string,
  joinCode: string,
  createdByUser: string,
  visibility: ClubVisibility,
  maxMembers: number,
  clubMembers: ClubMember[],
): Promise<Club> {
  const newClub = new Club();
  newClub.clubName = clubName;
  newClub.joinCode = joinCode;
  newClub.createdByUser = { userId: createdByUser } as User;
  newClub.visibility = visibility;
  newClub.maxMembers = maxMembers;
  newClub.clubMembers = clubMembers;

  return clubRepository.save(newClub);
}

async function getClubWithMembers(clubId: string): Promise<Club | null> {
  return clubRepository.findOne({
    where: { clubId },
    relations: { clubMembers: true },
  });
}

async function joinClubByCode(userId: string, joinCode: string): Promise<ClubMember> {
  const club = await clubRepository.findOne({
    where: { joinCode },
    relations: ['clubMembers', 'clubMembers.user'],
  });

  if (!club) {
    throw new Error('Invalid join code');
  }

  const existingMember = await clubMemberRepository.findOne({
    where: {
      user: { userId },
      club: { clubId: club.clubId },
    },
  });

  if (existingMember) {
    return null;
  }

  if (club.clubMembers.length >= club.maxMembers) {
    return null;
  }

  const membership = new ClubMember();

  return await clubMemberRepository.save(membership);
}

export {
  addClub,
  addClubWithMembers,
  getAllClubs,
  getClubByClubName,
  getClubByCreatedDate,
  getClubByCreatedUser,
  getClubById,
  getClubByMaxMembers,
  getClubByVisibility,
  getClubWithMembers,
  updateClubName,
  updateJoinCode,
  updateMaxMembers,
  updateVisibility,
  joinClubByCode,
  clubRepository,
};
