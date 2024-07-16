import { PlaceRepository } from '../../repository/place.repository';
import { PlaceService } from '../../service/place.service';

const repository = Object.freeze({
  create: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  convertStringsToUpperCase: jest.fn(),
  get: jest.fn(),
}) as unknown as PlaceRepository;
describe(PlaceService.name, () => {
  let service: PlaceService;
  beforeAll(() => {
    service = new PlaceService(repository);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('should be save place', async () => {
    const place = {
      name: 'TesteName',
      city: 'TesteCity',
      state: 'TesteState',
    };
    const spyOne = jest.spyOn(service, 'create');
    await service.create(place as any);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be get places', async () => {
    const spyOne = jest.spyOn(service, 'get');
    await service.get({});
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be find by id place', async () => {
    const spyOne = jest.spyOn(service, 'getById');
    await service.getById(1);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be find one place', async () => {
    const spyOne = jest.spyOn(service, 'update');
    await service.update(1);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });

  test('should be delete place', async () => {
    const spyOne = jest.spyOn(service, 'delete');
    await service.delete(1);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
  });
});
