import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { GenericRepository } from './Generic.Repository';

@Injectable()
export class PostRepository extends GenericRepository<Post> {
    constructor() {
        super('post');
    }

    async getAll(): Promise<Post[]> {
        return await this.prisma.post.findMany({ where: { active: true } });
    }

    async getById(id: number): Promise<Post> {
        return await this.prisma.post.findUnique({ where: { id: Number(id), active: true } });
    }
}
