import { Request, Response, Router } from 'express';
import { validate } from 'class-validator';

import { User } from '../entities/User';

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    //validation data
    let errs: any = {};
    const emailUser = await User.findOne({ email });
    const usernameUser = await User.findOne({ username });

    if (emailUser) errs.email = 'Email already taken';
    if (usernameUser) errs.username = 'Username already taken';

    if (Object.keys(errs).length > 0) res.status(400).json(errs);

    //create user
    const user = new User({ email, username, password });

    //db validation
    errs = await validate(user);
    if (errs.length > 0) return res.status(400).json({ errs });

    await user.save();
    return res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const router = Router();
router.post('/register', register);

export default router;
