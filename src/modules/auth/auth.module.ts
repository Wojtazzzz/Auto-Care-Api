import { Module } from '@nestjs/common';
import { OAuthJwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from '../../shared/prisma.service';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('AUTH0_ISSUER_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    OAuthJwtStrategy,
    AuthResolver,
    PrismaService,
    AuthService,
    AuthRepository,
  ],
  exports: [PassportModule],
})
export class AuthModule {}
