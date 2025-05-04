import { IsString } from 'class-validator';

export class LoginResponse {
  @IsString()
  token: string;

  @IsString()
  refreshToken: string;
}