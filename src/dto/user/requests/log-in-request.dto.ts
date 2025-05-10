import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'LogInRequestDto' })
export class LogInRequestDto {
  @ApiProperty({ default: 'taras@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ default: '1234' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
