import { Module } from '@nestjs/common';
import { InfraModule } from './core/infra/infra.module';

@Module({
  imports: [InfraModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
