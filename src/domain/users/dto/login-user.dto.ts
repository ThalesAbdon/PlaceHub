import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ type: String, example: 'luffy@gmail.com' })
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, example: 'Test*123456' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
