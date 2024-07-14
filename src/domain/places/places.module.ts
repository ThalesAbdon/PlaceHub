import { Module } from '@nestjs/common';
import { PlaceEntity } from './entity/place.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceController } from './controller/place.controller';
import { PlaceRepository } from './repository/place.repository';
import { PlaceService } from './service/place.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceEntity])],

  controllers: [PlaceController],
  providers: [PlaceRepository, PlaceService],
})
export class PlaceModule {}
