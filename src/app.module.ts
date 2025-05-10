import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './controlers/movie.controller';
import { MovieService } from './services/movie.service';
import { MovieEntity } from './entities/movie.entity';
import { MovieDataMapper } from './data-mapper/movie.data-mapper';
import { ChatGateway } from './chat/chat.gateway';
import { UserEntity } from './entities/user.entiity';
import { UserController } from './controlers/user.controller';
import { UserDataMapper } from './data-mapper/user.data-mapper';
import { UserService } from './services/user.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './gaurd/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
      entities: [MovieEntity],
    }),
    TypeOrmModule.forFeature([MovieEntity, UserEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AppController, MovieController, UserController],
  providers: [
    AppService,
    MovieService,
    MovieDataMapper,
    ChatGateway,
    UserService,
    UserDataMapper,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
