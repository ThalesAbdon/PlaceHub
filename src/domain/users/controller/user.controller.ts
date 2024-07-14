import { Controller, Inject, BadRequestException } from '@nestjs/common';
import { ControllerCore } from 'src/core/controller/controller-core.controller';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entity/user.entity';
import { UserIdDto } from '../dto/user-id.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('user')
export class UserController extends ControllerCore<any, CreateUserDto>(
  UserEntity,
  CreateUserDto,
  UserIdDto,
) {
  constructor(@Inject(UserService) private readonly service: UserService) {
    super();
  }

  async beforeCreate(createDto: CreateUserDto) {
    const user = await this.service.findByEmail(createDto.email);
    if (user[0]) {
      throw new BadRequestException('Email already exist');
    }

    return {
      ...createDto,
    };
  }
}
