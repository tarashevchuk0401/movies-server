import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

@ApiSchema({ name: 'getMovieRecommendationResponse' })
export class GetMovieRecommendationResponse {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;
}
