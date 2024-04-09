import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { CharacterModule } from './modules/characters/character.module';
import { EpisodeModule } from './modules/episodes/episode.module';
import { CommentModule } from './modules/comments/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configuration.database),
    CharacterModule,
    EpisodeModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
