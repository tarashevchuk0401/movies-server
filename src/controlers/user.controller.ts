import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { SignUpRequestDto } from '../dto/user/requests/sign-up-request.dto';
import { UserService } from '../services/user.service';
import { SuccessResponse } from '../interfaces/common/success.responsse';
import { LoginResponse } from '../dto/user/responses/log-in-response.dto';
import { LogInRequestDto } from '../dto/user/requests/log-in-request.dto';
import { Public } from '../decorators/public-route.decorator';

@Public()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body() data: SignUpRequestDto): Promise<SuccessResponse> {
    return await this.userService.signUp(data);
  }

  @Post('login')
  async login(@Body() data: LogInRequestDto): Promise<LoginResponse> {
    return await this.userService.logIn(data);
  }
}
