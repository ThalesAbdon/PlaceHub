import { PlaceRepository } from 'src/domain/places/repository/place.repository';

const repo = Object.freeze({
  save: jest.fn(),
  findOne: jest.fn(),
  findBy: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
});
describe(PlaceRepository.name, () => {
  let repository: PlaceRepository;
  beforeAll(() => {
    repository = new PlaceRepository(repo);
  });

  test('should be defined', () => {
    expect(repository).toBeDefined();
  });

  test('should be save place', async () => {
    const place = {
      name: 'TesteName',
      city: 'TesteCity',
      state: 'TesteState',
    };
    const spyOne = jest.spyOn(repository, 'create');
    await repository.create(place as any);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be get places', async () => {
    const spyOne = jest.spyOn(repository, 'get');
    await repository.get({});
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be find by id place', async () => {
    const spyOne = jest.spyOn(repository, 'findById');
    await repository.findById(1);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be find one place', async () => {
    const spyOne = jest.spyOn(repository, 'findOne');
    await repository.findOne({ name: 'test' });
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be delete place', async () => {
    const spyOne = jest.spyOn(repository, 'delete');
    await repository.delete(1);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be defined', async () => {
    const result = PlaceRepository.convertStringsToUpperCase({ name: 'teste' });
    expect(result.name).toBe('TESTE');
  });
});
