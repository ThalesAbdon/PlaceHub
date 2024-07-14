import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './database/config/typeOrm.migration-config';

@Module({
  imports: [TypeOrmModule.forRoot(config)],
  exports: [TypeOrmModule.forRoot(config)],
})
export class InfraModule {}
