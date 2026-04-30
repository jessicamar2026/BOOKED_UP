import { Request, Response } from 'express';
import {
  CreateClubSchema,
  UpdateClubNameSchema,
  UpdateJoinCodeSchema,
  UpdateClubVisibilitySchema,
  UpdateMaxMembersSchema,
} from '../validators/ClubValidator.js';
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
  updateClubName,
  updateJoinCode,
  updateVisibility,
  updateMaxMembers,
  getClubWithMembers,
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

async function updatedClubName(req: Request<{ clubId: string }>, res: Response): Promise<void> {
  try {
    const { clubId } = req.params;

    const result = UpdateClubNameSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json(result.error.flatten());
      return;
    }

    const { clubName } = result.data;

    const updatedClubName = await updateClubName(clubId, clubName);

    if (!updatedClubName) {
      res.status(404).json({ message: 'Club not found' });
      return;
    }

    res.json(updatedClubName);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function updatedClubJoinCode(req: Request<{ clubId: string }>, res: Response): Promise<void> {
  try {
    const { clubId } = req.params;

    const result = UpdateJoinCodeSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json(result.error.flatten());
      return;
    }

    const { joinCode } = result.data;

    const updatedJoinCode = await updateJoinCode(clubId, joinCode);

    if (!updatedJoinCode) {
      res.status(404).json({ message: 'Club not found' });
      return;
    }

    res.json(updatedJoinCode);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function updatedClubVisibility(
  req: Request<{ clubId: string }>,
  res: Response,
): Promise<void> {
  try {
    const { clubId } = req.params;

    const result = UpdateClubVisibilitySchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json(result.error.flatten());
      return;
    }

    const { visibility } = result.data;

    const updatedVisibility = await updateVisibility(clubId, visibility);

    if (!updatedVisibility) {
      res.status(404).json({ message: 'Club not found' });
      return;
    }

    res.json(updatedVisibility);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function updatedClubMaxMembers(
  req: Request<{ clubId: string }>,
  res: Response,
): Promise<void> {
  try {
    const { clubId } = req.params;

    const result = UpdateMaxMembersSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json(result.error.flatten());
      return;
    }

    const { maxMembers } = result.data;

    const updatedMaxMembers = await updateMaxMembers(clubId, maxMembers);

    if (!updatedMaxMembers) {
      res.status(404).json({ message: 'Club not found' });
      return;
    }

    res.json(updatedMaxMembers);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function getClubWithClubMembers(
  req: Request<{ clubId: string }>,
  res: Response,
): Promise<void> {
  const { clubId } = req.params;
  const club = await getClubWithMembers(clubId);

  if (!club) {
    res.status(404).json({ error: 'Club not found' });
    return;
  }

  res.json({ club });
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
  updatedClubName,
  updatedClubJoinCode,
  updatedClubVisibility,
  updatedClubMaxMembers,
  getClubWithClubMembers,
};
