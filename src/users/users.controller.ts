import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userServ: UsersService) {}

  @Post('/singup')
  createUser(@Body() body: CreateUserDto) {
    this.userServ.create(body.email, body.password);
  }
}
