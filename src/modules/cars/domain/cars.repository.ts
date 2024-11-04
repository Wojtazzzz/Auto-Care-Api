import { Car } from '@prisma/client';

type GetDetailsArgs = {
  userSub: string;
  carId: number;
};

export interface CarsRepository {
  getDetails(args: GetDetailsArgs): Promise<Car>;
}
