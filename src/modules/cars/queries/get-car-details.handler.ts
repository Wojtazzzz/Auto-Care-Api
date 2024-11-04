import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CarsRepository } from '../cars.repository';
import { carNotFoundError } from '../domain/exceptions/car.exception';

export class GetCarDetailsQuery {
  constructor(
    public readonly carId: number,
    public readonly userSub: string,
  ) {}
}

@QueryHandler(GetCarDetailsQuery)
export class GetCarDetailsHandler implements IQueryHandler {
  constructor(private readonly cars: CarsRepository) {}

  async execute(query: GetCarDetailsQuery) {
    const car = await this.cars.getDetails({
      userSub: query.userSub,
      carId: query.carId,
    });

    if (!car) {
      throw carNotFoundError('not found');
    }

    return car;
  }
}
