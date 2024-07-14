import { InjectRepository } from '@nestjs/typeorm';
import { Repository as RepositoryTypeorm, DeleteResult } from 'typeorm';

export function RepositoryCore<I extends { id: string }>(
  Entity,
): new (
  ...args: Pick<RepositoryTypeorm<I>, 'save' | 'find' | 'findOne' | 'delete'>[]
) => any {
  class Repository {
    constructor(
      @InjectRepository(Entity)
      private repo: Pick<
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

    async get(): Promise<I[]> {
      return this.repo.find();
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
  }

  return Repository;
}
