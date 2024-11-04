import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { GetCarDetailsQuery } from './get-car-details.handler';
import { GetCarDetailsRequest, GetCarDetailsResponse } from '../cars.dto';
import { User } from '../../auth/auth.decorator';
import { UserDto } from '../../auth/auth.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/auth-jwt.guard';

@Resolver()
export class GetCarDetailsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => GetCarDetailsResponse)
  async getCarDetails(
    @Context() ctx: { req: any },
    @Args('params', { type: () => GetCarDetailsRequest })
    params: GetCarDetailsRequest,
    @User() user: UserDto,
  ) {
    const query = new GetCarDetailsQuery(params.carId, user.sub);

    const result = await this.queryBus.execute(query);

    return new GetCarDetailsResponse(result);
  }
}
