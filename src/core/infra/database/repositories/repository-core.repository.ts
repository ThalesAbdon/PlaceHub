import { InjectRepository } from '@nestjs/typeorm';
import { Repository as RepositoryTypeorm, DeleteResult } from 'typeorm';

class Entity {
  id: number;
}

export class RepositoryCore<I> {
  constructor(
    @InjectRepository(Entity)
    protected repository: Pick<
      RepositoryTypeorm<I>,
      'save' | 'find' | 'findOne' | 'delete' | 'findBy'
    >,
  ) {}

  async create(input: I): Promise<I> {
    return this.repository.save(input);
  }

  async update(id: number, input: I): Promise<I> {
    return this.repository.save({ id, ...input });
  }

  async findById(id: any): Promise<any> {
    return this.repository.findOne(id);
  }

  async findOne(input: any): Promise<any> {
    return this.repository.findBy(input);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  static convertStringsToUpperCase(obj: any): any {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = obj[key].toUpperCase();
      }
    }
    return obj;
  }

  async get(where: Record<string, any>): Promise<unknown> {
    where = RepositoryCore.convertStringsToUpperCase(where);
    return this.repository.find({ where: where });
  }
}
