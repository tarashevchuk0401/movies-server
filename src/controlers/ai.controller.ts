import { Controller, Get } from '@nestjs/common';
import { AiService } from '../services/ai.service';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Get()
  async getMovieRecommendation() {
    return this.aiService.getMovieRecommendation('top 10 polish films');
  }
}
