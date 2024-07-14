import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserEntity } from '../entity/user.entity';
import { Transform } from 'class-transformer';

export class UserIdDto implements Pick<UserEntity, 'id'> {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? Number(value) : ''))
  id: number;
}
