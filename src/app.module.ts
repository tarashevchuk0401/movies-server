import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './controlers/movie.controller';
import { MovieService } from './services/movie.service';
import { MovieEntity } from './entities/movie.entity';
import { MovieDataMapper } from "./data-mapper/movie.data-mapper";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost',
      port: 1521,
      serviceName: 'orclpdb1',
      username: 'movies1',
      password: 'movies1',
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
      entities: [MovieEntity],
    }),
    TypeOrmModule.forFeature([MovieEntity]),
  ],
  controllers: [AppController, MovieController],
  providers: [AppService, MovieService, MovieDataMapper],
})
export class AppModule {}
