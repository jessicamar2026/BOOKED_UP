import { Request, Response } from 'express';
import { ClubMemberSchema } from '../validators/ClubMemberValidator.js';
import { ClubRole } from '../entities/ClubMember.js';
import {
  getAllClubMembers,
  getClubMemberById,
  getClubMemberByRole,
  addClubMember,
  updateClubMemberRole,
} from '../models/ClubMemberModel.js';

async function getClubMembers(req: Request, res: Response): Promise<void> {
  const users = await getAllClubMembers();
  res.json({ users });
}

async function getClubMemberByTheId(
  req: Request<{ clubMemberId: string }>,
  res: Response,
): Promise<void> {
  const { clubMemberId } = req.params;
  const clubMember = await getClubMemberById(clubMemberId);

  if (!clubMember) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json({ clubMember });
}

async function getClubMemberByTheRole(
  req: Request<{ role: ClubRole }>,
  res: Response,
): Promise<void> {
  const { role } = req.params;
  const clubMember = await getClubMemberByRole(role);

  if (!clubMember) {
    res.status(404).json({ error: 'Club Member not found' });
    return;
  }

  res.json({ clubMember });
}

async function createClubMember(req: Request, res: Response): Promise<void> {
  const result = ClubMemberSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const { clubMemberId, role } = result.data;
  const newUser = await addClubMember(clubMemberId, role);
  console.log(newUser);
  res.status(201).json({ todo: newUser });
}

async function updatedClubMemberRole(
  req: Request<{ clubMemberId: string }>,
  res: Response,
): Promise<void> {
  try {
    const { clubMemberId } = req.params;

    const parsed = ClubMemberSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json(parsed.error.flatten());
      return;
    }

    const { role } = parsed.data;

    const updatedClubMemberRole = await updateClubMemberRole(clubMemberId, role);

    if (!updatedClubMemberRole) {
      res.status(404).json({ message: 'Club member not found' });
      return;
    }

    res.json(updatedClubMemberRole);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export {
  getClubMembers,
  getClubMemberByTheId,
  getClubMemberByTheRole,
  createClubMember,
  updatedClubMemberRole,
};
