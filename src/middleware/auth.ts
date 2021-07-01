import { NextFunction, Request, Response } from 'express';

import User from '../entities/User';

export default async (_: Request, res: Response, next: NextFunction) => {
  try {
    const user: User | undefined = res.locals.user;
    if (!user) throw new Error('Unauthanticated');
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthanticated' });
  }
};
