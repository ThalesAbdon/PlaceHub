import { Inject } from '@nestjs/common';
import { IService } from 'src/shared/interfaces/service.interface';

export function ServiceCore<I = any, O = any>(): new (
  ...args: any[]
) => IService<I, O> {
  class Service implements IService<I, O> {
    constructor(@Inject() private readonly repository) {}

    async create(input: I): Promise<O> {
      return this.repository.create(input) as O;
    }

    async update(id: number, input: I): Promise<O> {
      return this.repository.update(id, input) as O;
    }

    async get(): Promise<O> {
      return this.repository.get() as O;
    }
    async getById(id: number): Promise<O> {
      return this.repository.findById({ where: { id } }) as O;
    }

    async delete(id: number): Promise<O> {
      return this.repository.delete(id) as O;
    }
  }

  return Service;
}
