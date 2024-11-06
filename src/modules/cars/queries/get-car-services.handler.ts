import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ServicesRepository } from '../repositories/services.repository';

export class GetCarServicesQuery {
  constructor(
    public readonly userSub: string,
    public readonly carId?: number,
    public readonly limit?: number,
  ) {}
}

@QueryHandler(GetCarServicesQuery)
export class GetCarServicesHandler implements IQueryHandler {
  constructor(private readonly services: ServicesRepository) {}

  async execute(query: GetCarServicesQuery) {
    return this.services.getCarServices({
      userSub: query.userSub,
      carId: query.carId,
      limit: query.limit,
    });
  }
}
