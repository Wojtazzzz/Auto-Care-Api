import { PrismaService } from '../../../shared/prisma.service';
import { forwardRef, Inject } from '@nestjs/common';

export class ServicesRepository {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private prisma: PrismaService,
  ) {}

  async getCarServices({
    userSub,
    carId,
    limit,
  }: {
    userSub: string;
    carId?: number;
    limit?: number;
  }) {
    return this.prisma.service.findMany({
      where: {
        Car: {
          ...(carId ? { id: carId } : { weight: 0 }),
          User: {
            sub: userSub,
          },
        },
      },
      take: limit,
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
  }
}
