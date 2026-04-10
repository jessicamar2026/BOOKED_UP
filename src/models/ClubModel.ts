import { AppDataSource } from '../dataSource.js';
import { Club } from '../entities/Club.js';

const clubRepository = AppDataSource.getRepository(Club);

async function getAllClubs(): Promise<Club[]> {
  return clubRepository.find();
}

async function getClubById(clubId: string): Promise<Club | null> {
  return clubRepository.findOne({ where: { clubId } });
}

export { getAllClubs, getClubById };
