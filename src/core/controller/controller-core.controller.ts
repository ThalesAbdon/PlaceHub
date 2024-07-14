import {
  Body,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Request,
  Response,
  Type,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import {
  Request as RequestExpress,
  Response as ResponseExpress,
} from 'express';
import { IController } from 'src/shared/interfaces/controller.interface';
import { IService } from 'src/shared/interfaces/service.interface';
import { createPipe, createPipeParam } from 'src/shared/utils/create-pipe';
import { AbstractValidationPipe } from 'src/shared/validators/validator-pipe';

export function ControllerCore<O, CreateDto>(
  Entity: any,
  createDto: Type<CreateDto>,
  ParamDto,
): new (...args: IService<any, O>[]) => IController<O> {
  const createValidate = createPipe(createDto);
  const createValidateParam = createPipeParam(ParamDto);

  //   @ApiSecurity('token')
  class Controller implements IController<O> {
    constructor(@Inject() private readonly service: IService<any, O>) {}

    async beforeCreate(createDto: CreateDto) {
      return createDto;
    }

    @Post('')
    @ApiBody({ type: createDto, required: true })
    @UsePipes(createValidate)
    async create(
      @Body() body: CreateDto,
      @Response() res: ResponseExpress,
    ): Promise<typeof Entity> {
      try {
        const bodyCreate = await this.beforeCreate(body);
        const data = await this.service.create(bodyCreate);
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }

    @Patch('/:id')
    @ApiParam({
      name: 'id',
      required: true,
    })
    @ApiBody({ type: createDto, required: true })
    @UsePipes(
      new AbstractValidationPipe(
        { whitelist: true, transform: true },
        { param: ParamDto },
      ),
    )
    async update(
      @Request() req: RequestExpress,
      @Response() res: ResponseExpress,
    ): Promise<O> {
      try {
        const data = await this.service.update(Number(req.params.id), req.body);
        return res.status(200).json(data) as O;
      } catch (error) {
        return res.status(500).json({ message: error.message }) as O;
      }
    }

    @Get('/')
    async get(
      @Request() req: RequestExpress,
      @Response() res: ResponseExpress,
    ): Promise<O> {
      try {
        const data = await this.service.get();
        return res.status(200).json(data) as O;
      } catch (error) {
        return res.status(500).json({ message: error.message }) as O;
      }
    }

    @Get('/:id')
    @ApiParam({
      name: 'id',
      required: true,
    })
    @UsePipes(createValidateParam)
    async getById(
      @Param('') { id }: { id: number },
      @Request() req: RequestExpress,
      @Response() res: ResponseExpress,
    ): Promise<O> {
      try {
        const data = await this.service.getById(id);
        return res.status(200).json(data) as O;
      } catch (error) {
        return res.status(500).json({ message: error.message }) as O;
      }
    }

    @Delete('/:id')
    @ApiParam({
      name: 'id',
      required: true,
    })
    @UsePipes(createValidateParam)
    async delete(
      @Param('') id: number,
      @Request() req: RequestExpress,
      @Response() res: ResponseExpress,
    ): Promise<O> {
      try {
        await this.service.delete(Number(req.params.id));
        return res.status(200).json({ message: 'Deleted!' }) as O;
      } catch (error) {
        return res.status(500).json({ message: error.message }) as O;
      }
    }
  }

  return Controller;
}
