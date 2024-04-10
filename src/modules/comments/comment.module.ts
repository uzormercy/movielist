import { Logger, Module } from '@nestjs/common';
import { CommentRepository } from './repositories/comment.repository';
import { Comment } from './entities/comment.entity';
import { CommentService } from './services/comment.service';
import { ResponseService } from 'src/shared/utils/respond.service';
import { CommentController } from './controllers/comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EpisodeModule } from '../episodes/episode.module';

@Module({
  imports: [SequelizeModule.forFeature([Comment]), EpisodeModule],
  providers: [CommentRepository, CommentService, ResponseService, Logger],
  controllers: [CommentController],
})
export class CommentModule {}
