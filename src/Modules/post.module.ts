import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PostController } from 'src/Controllers/Post.Controller';
import { UnitOfWork } from 'src/Repositories/UnitOfWok';
import { PostService } from 'src/Services/Post.Service';

@Module({
  controllers: [PostController],
  providers: [PostService, UnitOfWork],
  imports: [PassportModule],
})
export class PostModule {}
