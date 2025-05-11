import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsString } from 'class-validator';

@ApiSchema()
export class CreateChatRequest {
  @ApiPropertyOptional()
  @IsString()
  title?: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  isGroup: boolean;

  @ApiProperty()
  @IsArray()
  usersId: string[];
}
