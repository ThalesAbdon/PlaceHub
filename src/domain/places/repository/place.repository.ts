import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryCore } from 'src/core/infra/database/repositories/repository-core.repository';
import { PlaceEntity } from '../entity/place.entity';

@Injectable()
export class PlaceRepository extends RepositoryCore(PlaceEntity) {
  constructor(
    @InjectRepository(PlaceEntity)
    private repo: Pick<
      Repository<PlaceEntity>,
      'save' | 'findOne' | 'create' | 'findBy' | 'find'
    >,
  ) {
    super();
  }

  static convertStringsToUpperCase(obj: any): any {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = obj[key].toUpperCase();
      }
    }
    return obj;
  }

  async get(where: Record<string, any>): Promise<PlaceEntity[]> {
    where = PlaceRepository.convertStringsToUpperCase(where);
    return this.repo.find({ where: where });
  }
}
