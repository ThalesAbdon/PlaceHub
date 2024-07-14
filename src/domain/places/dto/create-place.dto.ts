import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PlaceEntity } from '../entity/place.entity';
import { Transform } from 'class-transformer';

export class CreatePlaceDto extends PlaceEntity {
  @ApiProperty({ type: String, example: 'A Sala do Tempo' })
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase())
  name: string;

  @ApiProperty({ type: String, example: 'Capital do Oeste' })
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase())
  city: string;

  @ApiProperty({ type: String, example: 'Kanto' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(1)
  @Transform((param) => param.value.toUpperCase())
  state: string;
}
