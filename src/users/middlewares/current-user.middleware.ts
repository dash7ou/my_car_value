import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userServ: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.session || {};
    if (userId) {
      const user = await this.userServ.findOne(userId.userId);
      // @ts-ignore
      req.currentUser = user;
    }

    next();
  }
}
