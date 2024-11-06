import { Module } from '@nestjs/common';
import { CarsResolver } from './cars.resolver';
import { CarsRepository } from './repositories/cars.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../shared/prisma.service';
import { GetUserCarsHandler } from './queries/get-user-cars.handler';
import { GetCarServicesHandler } from './queries/get-car-services.handler';
import { ServicesRepository } from './repositories/services.repository';

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
    CarsResolver,
    CarsRepository,
    ServicesRepository,
    GetUserCarsHandler,
    GetCarServicesHandler,
  ],
})
export class CarsModule {}
