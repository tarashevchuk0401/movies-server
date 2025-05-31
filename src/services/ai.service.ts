import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

const MODEL = 'gpt-4o-mini';
const INSTRUCTION = 'Write a recommendation for movie or list of movies';
const TEMPERATURE = 0.5;

@Injectable()
export class AiService {
  constructor(private openai: OpenAI) {}

  async getMovieRecommendation(text: string) {
    const chatCompletion = await this.openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: INSTRUCTION },
        { role: 'user', content: text },
      ],
      temperature: TEMPERATURE,
    });

    console.log(chatCompletion);
    return chatCompletion.choices[0].message.content;
  }
}
