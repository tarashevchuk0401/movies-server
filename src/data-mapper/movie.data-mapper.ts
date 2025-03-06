import { Injectable } from '@nestjs/common';
import { MovieEntity } from '../entities/movie.entity';
import { MovieItem } from '../interfaces/movie';

@Injectable()
export class MovieDataMaper {
  entityToItem(entity: MovieEntity): MovieItem {
    const { id, title, description, year, category, rating, actors } = entity;

    return {
      id,
      title,
      description,
      year,
      category,
      rating,
      ...(actors && { actors: actors.split(',') }),
    };
  }
}
