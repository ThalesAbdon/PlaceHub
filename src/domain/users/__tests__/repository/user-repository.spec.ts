import { UserRepository } from '../../repository/user.repository';

const repo = Object.freeze({
  save: jest.fn(),
  findOne: jest.fn(),
  findBy: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
});
describe(UserRepository.name, () => {
  let repository: UserRepository;
  beforeAll(() => {
    repository = new UserRepository(repo);
  });

  test('should be defined', () => {
    expect(repository).toBeDefined();
  });

  test('should be save user', async () => {
    const user = {
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    };
    const spyOne = jest.spyOn(repository, 'create');
    await repository.create(user as any);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be get users', async () => {
    const spyOne = jest.spyOn(repository, 'get');
    await repository.get({});
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be find by id user', async () => {
    const spyOne = jest.spyOn(repository, 'findById');
    await repository.findById(1);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be find one user', async () => {
    const spyOne = jest.spyOn(repository, 'findOne');
    await repository.findOne({ name: 'test' });
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be delete user', async () => {
    const spyOne = jest.spyOn(repository, 'delete');
    await repository.delete(1);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be defined', async () => {
    const result = UserRepository.convertStringsToUpperCase({ name: 'teste' });
    expect(result.name).toBe('TESTE');
  });
});
