import { Inject, Injectable } from '@nestjs/common';
import { ServiceCore } from 'src/core/services/service-core.service';
import { PlaceEntity } from '../entity/place.entity';
import { PlaceRepository } from '../repository/place.repository';

@Injectable()
export class PlaceService extends ServiceCore<PlaceEntity, PlaceEntity>() {
  constructor(
    @Inject(PlaceRepository) private readonly repository: PlaceRepository,
  ) {
    super();
  }
}
