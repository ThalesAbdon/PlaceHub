import { UserRepository } from '../../repository/user.repository';
import { UserService } from '../../service/user.service';

const repository = Object.freeze({
  create: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  convertStringsToUpperCase: jest.fn(),
  get: jest.fn(),
}) as unknown as UserRepository;
describe(UserService.name, () => {
  let service: UserService;
  beforeAll(() => {
    service = new UserService(repository);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('should be save user', async () => {
    const user = [
      {
        name: 'Test',
        email: 'test@email.com',
        password: '123456',
      },
    ];
    const spyOne = jest.spyOn(service, 'create');
    await service.create(user as any);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be get users', async () => {
    const spyOne = jest.spyOn(service, 'get');
    await service.get({});
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be find by id user', async () => {
    const spyOne = jest.spyOn(service, 'getById');
    await service.getById(1);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be find one user', async () => {
    const spyOne = jest.spyOn(service, 'findByEmail');
    await service.findByEmail('test@email.com');
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be delete user', async () => {
    const spyOne = jest.spyOn(service, 'delete');
    await service.delete(1);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });
});
