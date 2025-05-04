import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LogInRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
