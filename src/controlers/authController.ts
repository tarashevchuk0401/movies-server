import { Body, Controller, Get, NotFoundException, Post, Request } from '@nestjs/common';
import { SignUpRequestDto } from '../dto/user/requests/sign-up-request.dto';
import { AuthService } from '../services/auth.service';
import { SuccessResponse } from '../core/interfaces/common/success.responsse';
import { LoginResponse } from '../dto/user/responses/log-in-response.dto';
import { LogInRequestDto } from '../dto/user/requests/log-in-request.dto';
import { Public } from '../core/decorators/public-route.decorator';
import { GetMeResponse } from '../dto/user/responses/get-me-response.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Public()
  @Post('sign-up')
  async signUp(@Body() data: SignUpRequestDto): Promise<SuccessResponse> {
    return await this.userService.signUp(data);
  }

  @Public()
  @Post('sign-in')
  async signIn(@Body() data: LogInRequestDto): Promise<LoginResponse> {
    return await this.userService.signIn(data);
  }

  @Get('me')
  @ApiOkResponse({ type: GetMeResponse })
  async getMe(@Request() req: any): Promise<GetMeResponse> {
    return this.userService.getMe(req.user.id);
  }

  @Get('all-users')
  async getUsers(): Promise<any> {
    return new NotFoundException('NO DATA ');
  }
}
