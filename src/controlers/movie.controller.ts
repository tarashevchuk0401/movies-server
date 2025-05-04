import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { CreateMovieDto } from '../dto/movies/create-movie.dto';
import { GetMovieListDto } from '../dto/movies/get-movie-list.dto';
import { AuthGuard } from '../gaurd/auth.guard';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('list')
  async getMovies(@Query() params: GetMovieListDto) {
    return await this.movieService.getList(params);
  }

  @Get('item/:id')
  async getItem(@Param('id') id: string) {
    return this.movieService.getById(id);
  }

  @Delete('item/:id')
  async deleteItem(@Param('id') id: string) {
    return this.movieService.deleteItem(id);
  }

  @Post('item')
  async create(@Body() data: CreateMovieDto) {
    return this.movieService.createItem(data);
  }

  @UseGuards(AuthGuard)
  @Get('check-title/:title')
  async checkTitle(@Param('title') title: string): Promise<boolean> {
    return await this.movieService.checkTitle(title);
  }
}
