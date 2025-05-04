import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entiity';
import { UserDataMapper } from '../data-mapper/user.data-mapper';
import { SignUpRequestDto } from '../dto/user/requests/sign-up-request.dto';
import { SuccessResponse } from '../interfaces/common/success.responsse';
import { LogInRequestDto } from '../dto/user/requests/log-in-request.dto';
import { LoginResponse } from '../dto/user/responses/log-in-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userDataMapper: UserDataMapper,
    private jwtService: JwtService,
  ) {}

  async signUp(data: SignUpRequestDto): Promise<SuccessResponse> {
    await this.userRepository.save(
      this.userRepository.create({
        ...data,
      }),
    );
    return { isSuccess: true };
  }

  async logIn(data: LogInRequestDto): Promise<LoginResponse> {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ where: { email } });
    console.log('user', user);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return {
      token: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload),
    };
  }
}
