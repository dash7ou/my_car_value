import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userServ: UsersService) {}

  @Post('/singup')
  createUser(@Body() body: CreateUserDto) {
    this.userServ.create(body.email, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userServ.findOne(+id);
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userServ.find(email);
  }
}
