import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private userServ: UsersService) {}

  signup(email: string, password: string){
    // check email is exist
    const users = await this.userServ.find(email)

    if(users.length > 0){
        throw new BadRequestException("This email already exist!");
    }

    // hash password

    // create new user

    // return the user
  }

  signin(){}
}
