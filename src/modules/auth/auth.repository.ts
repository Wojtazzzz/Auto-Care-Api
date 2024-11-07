import { forwardRef, Inject } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';

export class AuthRepository {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private prisma: PrismaService,
  ) {}

  async findBySub(sub: string) {
    return this.prisma.user.findFirst({
      where: {
        sub,
      },
    });
  }

  async create(sub: string, email: string, name: string) {
    return this.prisma.user.create({
      data: {
        sub,
        email,
        name,
      },
    });
  }
}
