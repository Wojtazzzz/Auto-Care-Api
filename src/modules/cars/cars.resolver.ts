import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  GetUserCarsResponse,
  GetUserCarsRequest,
  GetCarServicesRequest,
  GetCarServicesResponse,
  CreateCarResponse,
  CreateCarRequest,
} from './cars.dto';
import { User } from '../auth/auth.decorator';
import { UserDto } from '../auth/auth.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { GetUserCarsQuery } from './queries/get-user-cars.handler';
import { GetCarServicesQuery } from './queries/get-car-services.handler';
import { CreateCarCommand } from './commands/create-car.handler';

@Resolver()
export class CarsResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

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

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CreateCarResponse)
  async createCar(
    @Args('params', { type: () => CreateCarRequest })
    params: CreateCarRequest,
    @User() user: UserDto,
  ) {
    const query = new CreateCarCommand(params.name, params.vin, user.sub);

    await this.commandBus.execute(query);

    return new CreateCarResponse();
  }
}
