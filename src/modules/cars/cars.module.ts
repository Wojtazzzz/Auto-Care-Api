import { Module } from '@nestjs/common';
import { GetCarDetailsResolver } from './queries/get-car-details.resolver';
import { CarsRepository } from './cars.repository';
import { GetCarDetailsHandler } from './queries/get-car-details.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../shared/prisma.service';

@Module({
  imports: [
    CqrsModule,
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('AUTH0_ISSUER_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    PrismaService,
    GetCarDetailsResolver,
    CarsRepository,
    GetCarDetailsHandler,
  ],
})
export class CarsModule {}
