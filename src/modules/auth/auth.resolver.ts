import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { AuthUserVerification } from './auth.model';
import { User } from './auth.decorator';
import { UserAuthDTO } from './auth.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/auth-jwt.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AuthUserVerification)
  async verify(
    @User() user: UserAuthDTO,
    @Context() ctx: { req: { headers?: { authorization: string } } },
  ) {
    try {
      const authorizationHeader = ctx.req.headers?.authorization;

      if (!authorizationHeader) {
        return {
          authorized: false,
        };
      }

      const { sub, email, nickname } =
        await this.authService.getUserInfoFromAuth0(authorizationHeader);

      await this.authService.createOrIgnore(sub, email, nickname);

      return {
        authorized: true,
      };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        return {
          authorized: true,
        };
      }
      return {
        authorized: false,
      };
    }
  }
}
