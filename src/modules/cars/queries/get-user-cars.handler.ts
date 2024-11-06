import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CarsRepository } from '../cars.repository';

export class GetUserCarsQuery {
  constructor(
    public readonly userSub: string,
    public readonly limit?: number,
  ) {}
}

@QueryHandler(GetUserCarsQuery)
export class GetUserCarsHandler implements IQueryHandler {
  constructor(private readonly cars: CarsRepository) {}

  async execute(query: GetUserCarsQuery) {
    return this.cars.getUserCars({
      userSub: query.userSub,
      limit: query.limit,
    });
  }
}
