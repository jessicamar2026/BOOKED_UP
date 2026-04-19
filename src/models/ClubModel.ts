import { AppDataSource } from '../dataSource.js';
import { Club, ClubVisibility } from '../entities/Club.js';

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

async function getClubByCreatedUser(createdByUser: string): Promise<Club | null> {
  return clubRepository.findOne({ where: { createdByUser } });
}

async function getClubByVisibility(visibility: ClubVisibility): Promise<Club | null> {
  return clubRepository.findOne({ where: { visibility } });
}

async function getClubByMaxMembers(maxMembers: number): Promise<Club | null> {
  return clubRepository.findOne({ where: { maxMembers } });
}

async function getClubByCreatedDate(createdAt: Date): Promise<Club | null> {
  return clubRepository.findOne({ where: { createdAt } });
}

async function addClub(
  clubId: string,
  clubName: string,
  joinCode: string,
  createdByUser: string,
  visibility: ClubVisibility,
  maxMembers: number,
): Promise<Club> {
  const newClub = new Club();
  newClub.clubId = clubId;
  newClub.clubName = clubName;
  newClub.joinCode = joinCode;
  newClub.createdByUser = createdByUser;
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

export {
  getAllClubs,
  getClubById,
  getClubByClubName,
  getClubByCreatedUser,
  getClubByVisibility,
  getClubByMaxMembers,
  getClubByCreatedDate,
  addClub,
  updateClubName,
  updateJoinCode,
  updateVisibility,
  updateMaxMembers,
};
