import { IsString } from 'class-validator';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema()
export class LoginResponse {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;
}