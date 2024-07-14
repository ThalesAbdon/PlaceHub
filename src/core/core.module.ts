import { Module } from '@nestjs/common';
import { Bcrypt } from './auth/bcrypt';
import * as bcrypt from 'bcrypt';
import { InfraModule } from './infra/infra.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { HttpContext } from './auth/http.context';

@Module({
  imports: [
    InfraModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: parseInt(process.env.JWT_EXPIRATION_TIME),
      },
    }),
  ],
  exports: [Bcrypt, InfraModule, AuthService, HttpContext],
  providers: [
    {
      provide: 'bcrypt',
      useValue: bcrypt,
    },
    Bcrypt,
    InfraModule,
    AuthService,
    HttpContext,
  ],
})
export class CoreModule {}
