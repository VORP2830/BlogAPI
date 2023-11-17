import { Injectable } from '@nestjs/common';
import { UserRepository } from './User.Respository';
import { PostRepository } from './Post.Repository';

@Injectable()
export class UnitOfWork {
  private _postRepository: PostRepository;
  private _userRepository: UserRepository;

  constructor() {
  }

  get postRepository(): PostRepository {
        return this._postRepository = new PostRepository();
  }

  get userRepository(): UserRepository {
        return this._userRepository = new UserRepository();
  }
  
}
