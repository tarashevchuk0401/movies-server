import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { GetMovieRecommendationRequest } from '../dto/ai/requests/get-movie-recommendation-request.interface';
import { GetMovieRecommendationResponse } from '../dto/ai/responses/get-movie-recommendation-response.interface';

const MODEL = 'gpt-4o-mini';
const INSTRUCTION = 'Write a recommendation for movie or list of movies';
const TEMPERATURE = 0.5;

@Injectable()
export class AiService {
  constructor(private openai: OpenAI) {}

  async getMovieRecommendation(
    data: GetMovieRecommendationRequest,
  ): Promise<GetMovieRecommendationResponse> {
    const chatCompletion = await this.openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: INSTRUCTION },
        { role: 'user', content: data.text },
      ],
      temperature: TEMPERATURE,
    });

    const response = chatCompletion.choices[0].message.content;
    return {
      text: response,
      createdAt: new Date(),
    };
  }
}
