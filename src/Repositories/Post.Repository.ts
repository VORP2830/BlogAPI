import { Injectable } from '@nestjs/common';
import { Post, PrismaClient } from '@prisma/client';


@Injectable()
export class PostRepository {
    constructor() { }
    private readonly prisma = new PrismaClient();

    async getAll(): Promise<Post[]> {
        return await this.prisma.post.findMany({ where: { active: true } });
    }

    async getById(id: number): Promise<Post> {
        return await this.prisma.post.findUnique({ where: { id: Number(id), active: true } });
    }

    async create(data: Post): Promise<Post> {
        return await this.prisma.post.create({
            data
        });
    }

    async update(data: Post): Promise<Post> {
        return await this.prisma.post.update({
            where: { id: Number(data.id) },
            data: {
                id: data.id,
                title: data.title,
                description: data.description,
                body: data.body
            }
        });
    }

    async delete(id: number): Promise<Post> {
        return await this.prisma.post.delete({ where: { id: Number(id) } });
    }
}