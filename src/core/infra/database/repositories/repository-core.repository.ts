import { InjectRepository } from '@nestjs/typeorm';
import { Repository as RepositoryTypeorm, DeleteResult } from 'typeorm';

class Entity {
  id: number;
}

export class RepositoryCore<I> {
  constructor(
    @InjectRepository(Entity)
    protected repo: Pick<
      RepositoryTypeorm<I>,
      'save' | 'find' | 'findOne' | 'delete' | 'findBy'
    >,
  ) {}

  async create(input: I): Promise<I> {
    return this.repo.save(input);
  }

  async update(id: number, input: I): Promise<I> {
    return this.repo.save({ id, ...input });
  }

  async findById(id: any): Promise<any> {
    return this.repo.findOne(id);
  }

  async findOne(input: any): Promise<any> {
    return this.repo.findBy(input);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
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
    return this.repo.find({ where: where });
  }
}
