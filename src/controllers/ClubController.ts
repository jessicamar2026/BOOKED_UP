import { Request, Response } from 'express';
import { ClubVisibility } from '../entities/Club.js';
import {
  addClub,
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
  clubRepository,
} from '../models/ClubModel.js';
import {
  CreateClubSchema,
  UpdateClubNameSchema,
  UpdateClubVisibilitySchema,
  UpdateJoinCodeSchema,
  UpdateMaxMembersSchema,
} from '../validators/ClubValidator.js';
import { clubMemberRepository } from '../models/ClubMemberModel.js';
import { ClubMember } from '../entities/ClubMember.js';
import { userRepository } from '../models/UserModel.js';

async function getClubs(req: Request, res: Response): Promise<void> {
  const clubs = await getAllClubs();
  res.json({ clubs });
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
  const clubs = await getClubByCreatedUser(createdByUser);

  if (!clubs || clubs.length === 0) {
    res.status(404).json({ error: 'Clubs not found' });
    return;
  }

  res.json({ clubs: [] });
}

async function getClubByTheVisibility(
  req: Request<{ visibility: ClubVisibility }>,
  res: Response,
): Promise<void> {
  const { visibility } = req.params;
  const club = await getClubByVisibility(visibility);

  if (!club) {
    res.status(404).json({ error: 'Clubs not found' });
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
    res.status(404).json({ error: 'Clubs not found' });
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
    res.status(404).json({ error: 'Clubs not found' });
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

  const { clubName, joinCode, userId, visibility, maxMembers } = result.data;
  const newClub = await addClub(clubName, joinCode, userId, visibility, maxMembers);
  console.log(newClub);
  res.status(201).json({ newClub });
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

async function joinClub(req: Request, res: Response): Promise<void> {
  const userId = req.session.authenticatedUser?.userId;
  const { joinCode } = req.body;

  if (!userId) {
    res.sendStatus(401);
    return;
  }

  if (!joinCode) {
    res.status(400).json({ error: 'Join code is required' });
    return;
  }

  try {
    const club = await clubRepository.findOne({
      where: { joinCode },
      relations: ['clubMembers', 'clubMembers.user'],
    });

    if (!club) {
      res.status(404).json({ error: 'Invalid join code' });
      return;
    }

    const user = await userRepository.findOneBy({ userId });

    const isAlreadyMember = club.clubMembers.some((member) => member.user.userId === userId);

    if (isAlreadyMember) {
      res.status(400).json({ error: 'Already a member of this club' });
      return;
    }

    if (club.clubMembers.length >= club.maxMembers) {
      res.status(400).json({ error: 'Club is full' });
      return;
    }

    const membership = new ClubMember();
    membership.user = user;
    membership.club = club;

    await clubMemberRepository.save(membership);

    res.status(201).json({
      message: 'Joined club successfully',
      clubId: club.clubId,
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export {
  createClub,
  getClubByCreator,
  getClubByTheCreatedDate,
  getClubByTheId,
  getClubByTheMaxMembers,
  getClubByTheName,
  getClubByTheVisibility,
  getClubs,
  getClubWithClubMembers,
  updatedClubJoinCode,
  updatedClubMaxMembers,
  updatedClubName,
  updatedClubVisibility,
  joinClub,
};
