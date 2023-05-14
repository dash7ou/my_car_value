import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fackeUserService: Partial<UsersService>;
  let fackeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fackeUserService = {
      findOne: (id: number) =>
        Promise.resolve({
          id,
          email: 'test@test.com',
          password: 'pass',
        } as User),
      find: (email: string) =>
        Promise.resolve([{ id: 1, email, password: 'pass' } as User]),
      // remove: () => {},
      // update: () => {},
    };

    fackeAuthService = {
      // signin: () => {},
      // signup: () => {},
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fackeUserService,
        },
        {
          provide: AuthService,
          useValue: fackeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers return all users with given email', async () => {
    const users = await controller.findAllUsers('test@test.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@test.com');
  });
});
