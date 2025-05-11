import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entiity';
import { UserDataMapper } from '../data-mapper/user.data-mapper';
import { SignUpRequestDto } from '../dto/user/requests/sign-up-request.dto';
import { SuccessResponse } from '../core/interfaces/common/success.responsse';
import { LogInRequestDto } from '../dto/user/requests/log-in-request.dto';
import { LoginResponse } from '../dto/user/responses/log-in-response.dto';
import { JwtService } from '@nestjs/jwt';
import { GetMeResponse } from '../dto/user/responses/get-me-response.dto';
import { GetParticipantsDto } from '../dto/chat/responses/get-particiipant.response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userDataMapper: UserDataMapper,
    private jwtService: JwtService,
  ) {}

  async signUp(data: SignUpRequestDto): Promise<SuccessResponse> {
    await this.checkMailAvailability(data.email);

    await this.userRepository.save(
      this.userRepository.create({
        ...data,
      }),
    );

    return { isSuccess: true };
  }

  async signIn(data: LogInRequestDto): Promise<LoginResponse> {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return {
      token: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload),
    };
  }

  async getMe(id: string): Promise<GetMeResponse> {
    const user = await this.userRepository.findOneBy({ id });

    return this.userDataMapper.entityToItem(user);
  }

  async getUsers(usersId: string[]): Promise<UserEntity[]> {
    return await this.userRepository.find({ where: { id: In(usersId) } });
  }

  async getParticipants(userId: string): Promise<GetParticipantsDto[]> {
    const users = await this.userRepository.find({
      where: { id: Not(userId) },
      select: ['firstName', 'lastName', 'id', 'email'],
    });

    return users.map((user) => this.userDataMapper.entityToListItem(user));
  }

  private async checkMailAvailability(email: string): Promise<void> {
    const mailExist = await this.userRepository.findOneBy({ email });
    if (mailExist) throw new BadRequestException('Email already exists');
  }
}
