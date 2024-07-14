import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entity/user.entity';

export class CreateUserDto extends UserEntity {
  @ApiProperty({ type: String, example: 'Luffy' })
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, example: 'luffy@gmail.com' })
  @IsString()
  @MaxLength(200)
  @MinLength(3)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, example: 'Test*123456' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}