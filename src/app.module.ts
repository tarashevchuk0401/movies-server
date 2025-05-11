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
import { AuthController } from './controlers/authController';
import { UserDataMapper } from './data-mapper/user.data-mapper';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './core/gaurd/auth.guard';
import { ChatEntity } from './entities/chat.entity';
import { MessageEntity } from './entities/message.entity';
import { MessageService } from './services/message.service';
import { ChatService } from './services/chat.service';
import { ChatController } from './controlers/chat.controller';

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
    TypeOrmModule.forFeature([
      MovieEntity,
      UserEntity,
      MessageEntity,
      ChatEntity,
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AppController, MovieController, AuthController, ChatController],
  providers: [
    AppService,
    MovieService,
    MovieDataMapper,
    ChatGateway,
    AuthService,
    UserDataMapper,
    MessageService,
    ChatService,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
