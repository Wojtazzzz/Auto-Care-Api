import { PrismaService } from '../../shared/prisma.service';
import { forwardRef, Inject } from '@nestjs/common';

export class CarsRepository {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private prisma: PrismaService,
  ) {}

  async getUserCars({ userSub, limit }: { userSub: string; limit?: number }) {
    return this.prisma.car.findMany({
      where: {
        User: {
          sub: userSub,
        },
      },
      take: limit,
      orderBy: [
        {
          weight: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
      select: {
        id: true,
        name: true,
        vin: true,
        weight: true,
        Insurance: {
          orderBy: {
            expiredAt: 'desc',
          },
          take: 1,
          select: {
            id: true,
            expiredAt: true,
          },
        },
        PeriodicService: {
          orderBy: {
            expiredAt: 'desc',
          },
          take: 1,
          select: {
            id: true,
            expiredAt: true,
          },
        },
      },
    });
  }
}
