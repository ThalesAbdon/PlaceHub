import { BadRequestException, Controller, Inject } from '@nestjs/common';
import { ControllerCore } from 'src/core/controller/controller-core.controller';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { PlaceEntity } from '../entity/place.entity';
import { PlaceIdDto } from '../dto/place-id.dto';
import { PlaceService } from '../service/place.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('places')
@ApiTags('Place')
export class PlaceController extends ControllerCore<any, CreatePlaceDto>(
  PlaceEntity,
  CreatePlaceDto,
  PlaceIdDto,
) {
  constructor(@Inject(PlaceService) private readonly service: PlaceService) {
    super();
  }

  async beforeCreate(createDto: CreatePlaceDto) {
    const place = await this.service.get(createDto);
    if (place[0]) {
      throw new BadRequestException('Place already exist');
    }
    return createDto;
  }
}
