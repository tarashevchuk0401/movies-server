import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

@ApiSchema({ name: 'me' })
export class GetMeResponse {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  email: string;
}
