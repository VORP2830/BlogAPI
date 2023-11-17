import { Injectable } from "@nestjs/common";
import { Post } from "@prisma/client";
import { BlogException } from "src/Exceptions/BlogException";
import { UnitOfWork } from "src/Repositories/UnitOfWok";

@Injectable()
export class PostService {
    constructor(private readonly unitOfWork: UnitOfWork) { }

    async getAll(): Promise<Post[]> {
        return await this.unitOfWork.postRepository.getAll();
    }

    async getById(id: number): Promise<Post> {
        return await this.unitOfWork.postRepository.getById(id);
    }

    async create(data: Post, userId: number): Promise<Post> {
        data.userId = userId;
        return await this.unitOfWork.postRepository.create(data);
    }

    async update(data: Post): Promise<Post> {
        const post = await this.unitOfWork.postRepository.getById(data.id);
        if(post == null) throw new BlogException("Post não encontrado");
        return await this.unitOfWork.postRepository.update(data);
    }

    async delete(id: number): Promise<Post> {
        const post = await this.unitOfWork.postRepository.getById(id);
        if(post == null) throw new BlogException("Post não encontrado");
        post.active = false;
        return await this.unitOfWork.postRepository.update(post);
    }

}