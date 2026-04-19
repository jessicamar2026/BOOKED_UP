import { Request, Response } from 'express';
import { CreateClubSchema } from '../validators/ClubValidator.js';
import { ClubVisibility } from '../entities/Club.js';
import {
  getAllClubs,
  getClubById,
  getClubByClubName,
  getClubByCreatedUser,
  getClubByVisibility,
  getClubByMaxMembers,
  getClubByCreatedDate,
  addClub,
} from '../models/ClubModel.js';

async function getClubs(req: Request, res: Response): Promise<void> {
  const clubMembers = await getAllClubs();
  res.json({ clubMembers });
}

async function getClubByTheId(req: Request<{ clubId: string }>, res: Response): Promise<void> {
  const { clubId } = req.params;
  const club = await getClubById(clubId);

  if (!club) {
    res.status(404).json({ error: 'Club not found' });
    return;
  }

  res.json({ club });
}

async function getClubByTheName(req: Request<{ clubName: string }>, res: Response): Promise<void> {
  const { clubName } = req.params;
  const club = await getClubByClubName(clubName);

  if (!club) {
    res.status(404).json({ error: 'Club not found' });
    return;
  }

  res.json({ club });
}

async function getClubByCreator(
  req: Request<{ createdByUser: string }>,
  res: Response,
): Promise<void> {
  const { createdByUser } = req.params;
  const club = await getClubByCreatedUser(createdByUser);

  if (!club) {
    res.status(404).json({ error: 'Club not found' });
    return;
  }

  res.json({ club });
}

async function getClubByTheVisibility(
  req: Request<{ visibility: ClubVisibility }>,
  res: Response,
): Promise<void> {
  const { visibility } = req.params;
  const club = await getClubByVisibility(visibility);

  if (!club) {
    res.status(404).json({ error: 'Club not found' });
    return;
  }

  res.json({ club });
}

async function getClubByTheMaxMembers(
  req: Request<{ maxMembers: number }>,
  res: Response,
): Promise<void> {
  const { maxMembers } = req.params;
  const club = await getClubByMaxMembers(maxMembers);

  if (!club) {
    res.status(404).json({ error: 'Club not found' });
    return;
  }

  res.json({ club });
}

async function getClubByTheCreatedDate(
  req: Request<{ createdAt: Date }>,
  res: Response,
): Promise<void> {
  const { createdAt } = req.params;
  const club = await getClubByCreatedDate(createdAt);

  if (!club) {
    res.status(404).json({ error: 'Club not found' });
    return;
  }

  res.json({ club });
}

async function createClub(req: Request, res: Response): Promise<void> {
  const result = CreateClubSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const { clubId, clubName, joinCode, createdByUser, visibility, maxMembers } = result.data;
  const newClub = await addClub(clubId, clubName, joinCode, createdByUser, visibility, maxMembers);
  console.log(newClub);
  res.status(201).json({ todo: newClub });
}

export {
  getClubs,
  getClubByTheId,
  getClubByTheName,
  getClubByCreator,
  getClubByTheVisibility,
  getClubByTheMaxMembers,
  getClubByTheCreatedDate,
  createClub,
};
