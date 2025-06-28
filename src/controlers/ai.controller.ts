import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from '../services/ai.service';
import { GetMovieRecommendationRequest } from '../dto/ai/requests/get-movie-recommendation-request.interface';
import { GetMovieRecommendationResponse } from '../dto/ai/responses/get-movie-recommendation-response.interface';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('movie-recommendation')
  @ApiOkResponse({ type: GetMovieRecommendationRequest })
  async getMovieRecommendation(
    @Body() data: GetMovieRecommendationRequest,
  ): Promise<GetMovieRecommendationResponse> {
    return this.aiService.getMovieRecommendation(data);
  }
}
