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
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './users.entity';

@Controller('auth')
export class UsersController {
  constructor(private userServ: UsersService, private authServ: AuthService) {}

  @Serialize(UserDto)
  @Post('/singup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authServ.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Serialize(UserDto)
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authServ.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // @Serialize(UserDto)
  // @Get('/whoami')
  // whoami(@Session() session: any) {
  //   return this.userServ.findOne(session.userId);
  // }

  @Serialize(UserDto)
  @Get('/whoami')
  whoami(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  sginout(@Session() session: any) {
    session.userId = null;
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
