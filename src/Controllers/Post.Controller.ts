import { Body, Controller, Delete, Get, Param, Post as NestPost, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Post } from "@prisma/client";
import { BlogException } from "src/Exceptions/BlogException";
import { PostService } from "src/Services/Post.Service";

@Controller('api/post')
export class PostController{
    constructor(private readonly postService: PostService) { }

    @UseGuards(AuthGuard())
    @Get()
    async getAll(): Promise<{ message: string } | Post[]>{
        try {
            return await this.postService.getAll();
        } catch (error) {
            if (error instanceof BlogException) {
                return { message: error.message };
            }
        return { message: "Erro ao executar a ação" };
        }
    }
    @UseGuards(AuthGuard())
    @Get(":id")
    async getById(@Param('id') id: number): Promise<{ message: string } | Post>{
        try {
            return await this.postService.getById(id);
        } catch (error) {
            if (error instanceof BlogException) {
                return { message: error.message };
            }
        return { message: "Erro ao executar a ação" };
        }
    }
    @UseGuards(AuthGuard())
    @NestPost()
    async create(@Body() data: Post): Promise<{ message: string } | Post> {
        try {
            return await this.postService.create(data, 1);
        } catch (error) {
            if (error instanceof BlogException) {
                return { message: error.message };
            }
            return { message: "Erro ao executar a ação" };
        }
    }
    @UseGuards(AuthGuard())
    @Put()
    async updatePayment(@Body() data: Post): Promise<{ message: string } | Post>{
        try {
            return await this.postService.update(data);
        } catch (error) {
            if (error instanceof BlogException) {
                return { message: error.message };
            }
            return { message: "Erro ao executar a ação" };
        }
    }
    @UseGuards(AuthGuard())
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<{ message: string } | Post> {
        try {
            return await this.postService.delete(id);
        } catch (error) {
            if (error instanceof BlogException) {
                return { message: error.message };
            }
            return { message: "Erro ao executar a ação" };
        }
    }
}