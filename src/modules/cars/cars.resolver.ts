import { Resolver, Query, Args } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetUserCarsResponse,
  GetUserCarsRequest,
  GetCarServicesRequest,
  GetCarServicesResponse,
} from './cars.dto';
import { User } from '../auth/auth.decorator';
import { UserDto } from '../auth/auth.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { GetUserCarsQuery } from './queries/get-user-cars.handler';
import { GetCarServicesQuery } from './queries/get-car-services.handler';

@Resolver()
export class CarsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => GetUserCarsResponse)
  async getUserCars(
    @Args('params', { type: () => GetUserCarsRequest })
    params: GetUserCarsRequest,
    @User() user: UserDto,
  ) {
    const query = new GetUserCarsQuery(user.sub, params.limit);

    const result = await this.queryBus.execute(query);

    return new GetUserCarsResponse(result);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => GetCarServicesResponse)
  async getCarServices(
    @Args('params', { type: () => GetCarServicesRequest })
    params: GetCarServicesRequest,
    @User() user: UserDto,
  ) {
    const query = new GetCarServicesQuery(user.sub, params.carId, params.limit);

    const result = await this.queryBus.execute(query);

    return new GetCarServicesResponse(result);
  }
}
