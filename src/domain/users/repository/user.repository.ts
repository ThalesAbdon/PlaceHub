import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryCore } from 'src/core/infra/database/repositories/repository-core.repository';

@Injectable()
export class UserRepository extends RepositoryCore<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    protected repo: Pick<
      Repository<UserEntity>,
      'save' | 'find' | 'findOne' | 'delete' | 'findBy'
    >,
  ) {
    super(repo);
  }

  static convertStringsToUpperCase(obj: any): any {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && key !== 'email') {
        obj[key] = obj[key].toUpperCase();
      }
    }
    return obj;
  }
}
