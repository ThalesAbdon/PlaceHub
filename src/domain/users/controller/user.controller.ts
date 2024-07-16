import {
  Response,
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { ControllerCore } from 'src/core/controller/controller-core.controller';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Bcrypt } from 'src/core/auth/bcrypt';
import { UserEntity } from '../entity/user.entity';
import { UserIdDto } from '../dto/user-id.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/core/auth/auth.service';
import { AbstractValidationPipe } from 'src/shared/validators/validator-pipe';
import { LoginUserDto } from '../dto/login-user.dto';
import { Response as ResponseExpress } from 'express';

@Controller('users')
@ApiTags('user')
export class UserController extends ControllerCore<any, CreateUserDto>(
  UserEntity,
  CreateUserDto,
  UserIdDto,
) {
  constructor(
    @Inject(UserService) private readonly service: UserService,
    @Inject(Bcrypt) private readonly bcrypt: Bcrypt,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {
    super();
  }

  async beforeCreate(createDto: CreateUserDto) {
    const user = await this.service.findByEmail(createDto.email);
    if (user) {
      throw new BadRequestException('Email already exist');
    }

    return {
      ...createDto,
      password: this.bcrypt.sign(createDto.password),
    };
  }

  @Post('')
  @ApiBody({ type: CreateUserDto, required: true })
  @UsePipes(
    new AbstractValidationPipe(
      { whitelist: true, transform: true },
      { body: CreateUserDto },
    ),
  )
  async create(
    @Body() body: CreateUserDto,
    @Response() res: ResponseExpress,
  ): Promise<ResponseExpress> {
    try {
      const bodyCreate = await this.beforeCreate(body);
      const data = await this.service.create(bodyCreate);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Post('login')
  @ApiBody({ type: LoginUserDto, required: true })
  @UsePipes(
    new AbstractValidationPipe(
      { whitelist: true, transform: true },
      { body: LoginUserDto },
    ),
  )
  async login(@Body() body) {
    const user = await this.service.findByEmail(body.email);
    if (!user[0]) {
      throw new BadRequestException('User not exist!');
    }
    const isValidPass = this.bcrypt.compare(body.password, user[0].password);

    if (!isValidPass) {
      throw new BadRequestException('Email or Password incorrects!');
    }

    const token = await this.authService.createToken({
      user: {
        id: user[0].id,
        name: user[0].name,
      },
    });
    return { auth: true, token: token };
  }
}
