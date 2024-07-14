import { Module } from '@nestjs/common';
import { UserModule } from './domain/users/users.module';
import { CoreModule } from './core/core.module';
import { PlaceModule } from './domain/places/places.module';

@Module({
  imports: [
    { global: true, module: CoreModule },
    CoreModule,
    UserModule,
    PlaceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
