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
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
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
