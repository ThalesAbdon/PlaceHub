import { Bcrypt } from 'src/core/auth/bcrypt';
import { UserController } from '../../controller/user.controller';
import { UserService } from '../../service/user.service';
import { AuthService } from 'src/core/auth/auth.service';
import { Request, Response } from 'express';
import { LoginUserDto } from '../../dto/login-user.dto';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';

const service = Object.freeze({
  create: jest.fn(),
  update: jest.fn(),
  get: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
  findByEmail: jest.fn().mockResolvedValue([{}]),
}) as unknown as UserService;

const bcrypt = Object.freeze({
  sign: jest.fn(),
  compare: jest.fn(),
}) as unknown as Bcrypt;

const authService = Object.freeze({
  createToken: jest.fn(),
  checkToken: jest.fn(),
}) as unknown as AuthService;

const res = Object.freeze({
  status: jest.fn().mockReturnValue({ json: jest.fn() }),
}) as unknown as Response;

describe(UserService.name, () => {
  let controller: UserController;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    controller = new UserController(service, bcrypt, authService);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('should be save user', async () => {
    const user = [
      {
        name: 'Test',
        email: 'test@email.com',
        password: '123456',
        id: 1,
        createdAt: undefined,
        updatedAt: undefined,
      },
    ];

    jest.spyOn(service, 'findByEmail').mockResolvedValue(null);
    jest.spyOn(bcrypt, 'sign').mockReturnValue('hashedPassword');
    jest.spyOn(controller, 'beforeCreate').mockReturnValue(null);
    jest.spyOn(service, 'create').mockResolvedValue({ ...user[0] } as any);
    const spyOne = jest.spyOn(controller, 'create');
    await controller.create({ ...user[0] } as any, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should able execute with error', async () => {
    jest.spyOn(service, 'create').mockRejectedValue({ message: 'Error' });
    const reponse = await controller.create({} as any, res);
    expect(reponse).toEqual(undefined);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should be get users', async () => {
    const spyOne = jest.spyOn(controller, 'get');
    await controller.get({} as Request, res);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be find by id user', async () => {
    const spyOne = jest.spyOn(controller, 'getById');
    await controller.getById({ id: 1 }, {} as Request, res);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be delete user', async () => {
    const spyOne = jest.spyOn(controller, 'delete');
    await controller.delete(1, {} as Request, res);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should throw an error if email already exists', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test',
      id: 1,
      createdAt: undefined,
      updatedAt: undefined,
    };

    const user = [
      {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test',
        id: 1,
        createdAt: undefined,
        updatedAt: undefined,
      },
    ];

    jest.spyOn(service, 'findByEmail').mockResolvedValue([user] as any);
    try {
      await controller.beforeCreate(createUserDto);
    } catch (err) {
      expect(err.message).toBe('Email already exist');
    }
  });

  test('should throw an error if email already exists', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test',
      id: 1,
      createdAt: undefined,
      updatedAt: undefined,
    };

    jest.spyOn(service, 'findByEmail').mockResolvedValue([] as any);
    jest.spyOn(bcrypt, 'sign').mockResolvedValue('hash');
    const response = await controller.beforeCreate(createUserDto);
    expect(response).toBeDefined();
  });

  it('should throw an error create', async () => {
    const user = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test',
      id: 1,
      createdAt: undefined,
      updatedAt: undefined,
    };

    jest.spyOn(service, 'findByEmail').mockResolvedValue([user] as any);
    try {
      await controller.create(user as any, res);
    } catch (err) {
      expect(err.message).toBe('Email already exist');
    }
  });

  it('should login user and return a token', async () => {
    const loginUserDto: LoginUserDto = {
      email: 'test@test.com',
      password: 'password123',
    };
    const user = [
      {
        id: 1,
        name: 'Test',
        email: 'test@test.com',
        password: 'password123',
        createdAt: undefined,
        updatedAt: undefined,
      },
    ];

    const token = 'jwt-token';

    jest.spyOn(service, 'findByEmail').mockResolvedValue({ ...user } as any);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    jest.spyOn(authService, 'createToken').mockResolvedValue(token);

    const result = await controller.login(loginUserDto);

    expect(service.findByEmail).toHaveBeenCalledWith(loginUserDto.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      loginUserDto.password,
      user[0].password,
    );
    expect(authService.createToken).toHaveBeenCalledWith({
      user: { id: user[0].id, name: user[0].name },
    });
    expect(result).toEqual({ auth: true, token });
  });

  it('should throw an error if user does not exist', async () => {
    const loginUserDto: LoginUserDto = {
      email: 'test@test.com',
      password: 'password123',
    };
    jest.spyOn(service, 'findByEmail').mockResolvedValue([] as any);
    await expect(controller.login(loginUserDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw error if Email or Password incorrects!', async () => {
    const loginDto: LoginUserDto = {
      email: 'test@example.com',
      password: 'password',
    };
    const user = [
      {
        id: 1,
        email: 'test@test.com',
        password: 'h1',
        name: 'Test',
        createdAt: undefined,
        updatedAt: undefined,
      },
    ];

    jest.spyOn(service, 'findByEmail').mockResolvedValue({ ...user } as any);
    jest.spyOn(bcrypt, 'compare').mockReturnValue(false);

    await expect(controller.login(loginDto)).rejects.toThrow(
      BadRequestException,
    );
  });
});
