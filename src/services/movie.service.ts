import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { GetMovieListDto } from '../dto/get-movie-list.dto';
import {
  MovieDataMapper,
} from '../data-mapper/movie.data-mapper';
import { ListResponse } from '../interfaces/list-response';
import { MovieItem } from '../interfaces/movie';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    private readonly movieDataMapper: MovieDataMapper,
  ) {}

  async createItem(data: CreateMovieDto) {
    const { title, description, year, category, actors } = data;

    const newMovie = await this.movieRepository.save(
      this.movieRepository.create({
        title,
        year,
        category,
        rating: 9,
        description,
        ...(actors && { actors: actors.join(', ') }),
      }),
    );

    return {
      id: newMovie.id,
    };
  }

  async getList(params: GetMovieListDto): Promise<ListResponse<MovieItem>> {
    const { page, pageSize, sortColumn, sortDirection } = params;
    console.log(page)
    console.log(pageSize)

    const [data, total] = await this.movieRepository.findAndCount({
      order: {
        ...(sortColumn ? { [sortColumn]: sortDirection } : { id: 'DESC' }),
      },
      skip: (+page - 1) * +pageSize,
      take: +pageSize,
    });
    return {
      data: data.map((movie) => this.movieDataMapper.entityToItem(movie)),
      total,
    };
  }

  async getById(id: string) {
    const movie = await this.movieRepository.findOne({
      where: { id: Number(id) },
    });
    if (!movie) {
      throw new NotFoundException();
    }
    return movie;
  }

  async deleteItem(id: string) {
    const result = await this.movieRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }

  async checkTitle(title: string): Promise<boolean> {
    const isExist = await this.movieRepository.exists({ where: { title } });
    return !isExist;
  }
}
