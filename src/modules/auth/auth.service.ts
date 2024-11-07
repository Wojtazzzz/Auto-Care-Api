import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UserAuth0InfoDTO } from './auth.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly repository: AuthRepository,
  ) {}

  async getUserInfoFromAuth0(accessToken: string): Promise<UserAuth0InfoDTO> {
    const { data } = await firstValueFrom(
      this.httpService.get('/userinfo', {
        headers: {
          Authorization: accessToken,
        },
      }),
    );

    return data;
  }

  async createOrIgnore(sub: string, email: string, name: string) {
    const user = await this.repository.findBySub(sub);

    if (!user) {
      await this.repository.create(sub, email, name);
    }
  }
}
