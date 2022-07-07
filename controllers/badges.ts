import { NextFunction, Request, RequestHandler, Response } from 'express';
import Badge from '../models/badge';

const getBadgesByUser = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idUser } = req.params;
    const unlockedBadges = await Badge.getBadgesByUser(Number(idUser));
    return res.status(200).json(unlockedBadges);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

export default { getBadgesByUser };
