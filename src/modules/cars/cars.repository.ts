import { PrismaService } from '../../shared/prisma.service';
import { forwardRef, Inject } from '@nestjs/common';

export class CarsRepository {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private prisma: PrismaService,
  ) {}

  async getDetails({ userSub, carId }) {
    return this.prisma.car.findFirst({
      where: {
        id: carId,
        User: {
          sub: userSub,
        },
      },
    });
  }
}
