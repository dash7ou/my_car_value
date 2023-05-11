import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
  constructor(private userServ: UsersService) {}

  @Post('/singup')
  createUser(@Body() body: CreateUserDto) {
    this.userServ.create(body.email, body.password);
  }

  @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userServ.findOne(+id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  @Serialize(UserDto)
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userServ.find(email);
  }

  @Serialize(UserDto)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userServ.update(+id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userServ.remove(+id);
  }
}
