import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userServ: UsersService) {}

  async signup(email: string, password: string) {
    // check email is exist
    const users = await this.userServ.find(email);

    if (users.length > 0) {
      throw new BadRequestException('This email already exist!');
    }

    // hash password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashPassword = `${salt}.${hash.toString('hex')}`;

    // create new user

    // return the user
  }

  signin() {}
}
