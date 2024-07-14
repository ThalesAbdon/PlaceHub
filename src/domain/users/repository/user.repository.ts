import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryCore } from 'src/core/infra/database/repositories/repository-core.repository';

@Injectable()
export class UserRepository extends RepositoryCore(UserEntity) {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Pick<
      Repository<UserEntity>,
      'save' | 'findOne' | 'create' | 'findBy'
    >,
  ) {
    super();
  }
}
