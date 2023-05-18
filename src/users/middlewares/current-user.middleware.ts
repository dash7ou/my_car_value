import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../users.entity';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userServ: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.session || {};
    if (userId) {
      const user = await this.userServ.findOne(userId.userId);
      req.currentUser = user;
    }

    next();
  }
}
