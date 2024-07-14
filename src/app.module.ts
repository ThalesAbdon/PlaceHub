import { Module } from '@nestjs/common';
import { InfraModule } from './core/infra/infra.module';
import { UserModule } from './domain/users/users.module';

@Module({
  imports: [InfraModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
