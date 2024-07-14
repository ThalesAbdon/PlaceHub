import { IsNotEmpty, IsNumber } from 'class-validator';

import { Transform } from 'class-transformer';
import { PlaceEntity } from '../entity/place.entity';

export class PlaceIdDto implements Pick<PlaceEntity, 'id'> {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? Number(value) : ''))
  id: number;
}
