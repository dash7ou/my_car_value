import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { BadRequestException } from '@nestjs/common';

describe('Auth Service', () => {
  let service: AuthService;
  let fackeUserService: Partial<UsersService>;

  beforeEach(async () => {
    //create a fake copy of the user service
    fackeUserService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fackeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user with salted and hashed password', async () => {
    const email = 'tugrp@example.com';
    const password = 'password';

    const user = await service.signup(email, password);
    expect(user.password).not.toEqual(password);

    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if email already exist', async () => {
    const email = 'tugrp@example.com';
    const password = 'password';

    fackeUserService.find = () =>
      Promise.resolve([{ id: 1, email: 'tst@s,ci', password: 'dsds' } as User]);

    await expect(service.signup(email, password)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws an error if email not exist', async () => {
    const email = 'tugrp@example.com';
    const password = 'password';

    await expect(service.signin(email, password)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws an error if password not matched', async () => {
    const email = 'tugrp@example.com';
    const password = 'password';

    fackeUserService.find = () =>
      Promise.resolve([{ id: 1, email, password: 'dsds' } as User]);

    await expect(service.signin(email, password)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('return user if correct password is provided', async () => {
    const email = 'tugrp@example.com';
    const password = 'password';

    fackeUserService.find = () =>
      Promise.resolve([
        {
          id: 1,
          email,
          password:
            'd8eb1779b30993e1.6f0229be83ed578f6617d2d027031e7dfc9ec722773e08bc46f34b75dd39c2a6',
        } as User,
      ]);

    const user = await service.signin(email, password);
    expect(user).toBeDefined();
  });
});
