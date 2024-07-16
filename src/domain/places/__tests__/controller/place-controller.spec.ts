import { Request, Response } from 'express';
import { PlaceController } from '../../controller/place.controller';
import { PlaceService } from '../../service/place.service';

const service = Object.freeze({
  create: jest.fn(),
  update: jest.fn(),
  get: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
  findByEmail: jest.fn(),
}) as unknown as PlaceService;

const res = Object.freeze({
  status: jest.fn().mockReturnValue({ json: jest.fn() }),
}) as unknown as Response;

describe(PlaceService.name, () => {
  let controller: PlaceController;
  beforeAll(() => {
    controller = new PlaceController(service);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('should be save user', async () => {
    const user = {
      name: 'TesteName',
      city: 'TesteCity',
      state: 'TesteState',
    };
    const spyOne = jest.spyOn(controller, 'create');
    await controller.create(user as any, res);
    expect(spyOne).toHaveBeenCalled();
    expect(spyOne).toHaveBeenCalledTimes(1);
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

  test('should be before create', async () => {
    try {
      jest.spyOn(service, 'get').mockReturnValue({} as any);
      await controller.beforeCreate({
        name: 'TesteName',
        city: 'TesteCity',
        state: 'TesteState',
        id: 0,
        createdAt: undefined,
        updatedAt: undefined,
      });
    } catch (e) {
      expect(e.message).toBe('Place already exist');
    }
  });

  test('should be before create', async () => {
    try {
      jest.spyOn(service, 'get').mockReturnValue({} as any);
      await controller.beforeCreate({
        name: 'TesteName',
        city: 'TesteCity',
        state: 'TesteState',
        id: 0,
        createdAt: undefined,
        updatedAt: undefined,
      });
    } catch (e) {
      expect(e.message).toBe('Place already exist');
    }
  });

  test('should be throw error', async () => {
    try {
      jest.spyOn(service, 'get').mockReturnValue([{}] as any);
      await controller.beforeCreate({
        name: 'TesteName',
        city: 'TesteCity',
        state: 'TesteState',
        id: 0,
        createdAt: undefined,
        updatedAt: undefined,
      });
    } catch (e) {
      expect(e.message).toBe('Place already exist');
    }
  });
});
