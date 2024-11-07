import { PrismaService } from '../../../shared/prisma.service';
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

  async create({
    name,
    vin,
    userSub,
  }: {
    name: string;
    vin: string;
    userSub: string;
  }) {
    const {
      _max: { weight: lastWeight },
    } = await this.prisma.car.aggregate({
      _max: { weight: true },
      where: {
        User: {
          sub: userSub,
        },
      },
    });

    return this.prisma.user.update({
      where: {
        sub: userSub,
      },
      data: {
        cars: {
          create: {
            name,
            vin,
            weight: lastWeight !== null ? lastWeight + 1 : 0,
          },
        },
      },
    });
  }
}
