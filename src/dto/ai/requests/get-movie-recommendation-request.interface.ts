import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@ApiSchema({ name: 'getMovieRecommendation' })
export class GetMovieRecommendationRequest {
  @ApiProperty({ example: 'Top 10 comedy films' })
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  text: string;
}
