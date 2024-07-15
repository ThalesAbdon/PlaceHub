import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryCore } from 'src/core/infra/database/repositories/repository-core.repository';
import { PlaceEntity } from '../entity/place.entity';

@Injectable()
export class PlaceRepository extends RepositoryCore<PlaceEntity> {
  constructor(
    @InjectRepository(PlaceEntity)
    protected repo: Pick<
      Repository<PlaceEntity>,
      'save' | 'find' | 'findOne' | 'delete' | 'findBy'
    >,
  ) {
    super(repo);
  }
}
