import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@prisma/client";
import { BlogException } from "src/Exceptions/BlogException";
import { UserService } from "src/Services/User.Service";

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get(':id')
  async getById(@Param('id') id: number): Promise<User> {
    try {
      return await this.userService.getById(id);
    } catch (error) {
      throw this.handleException(error);
    }
  }

  @Post()
  async create(@Body() data: User): Promise<User> {
    try {
      return await this.userService.create(data);
    } catch (error) {
      throw this.handleException(error);
    }
  }

  @UseGuards(AuthGuard())
  @Put()
  async update(@Body() data: User): Promise<User> {
    try {
      return await this.userService.update(data);
    } catch (error) {
      throw this.handleException(error);
    }
  }

  @Post('login')
  async login(@Body() data: any): Promise<any> {
    try {
      return await this.userService.login(data);
    } catch (error) {
      throw this.handleException(error);
    }
  }

  private handleException(error: any): Error {
    if (error instanceof BlogException) {
      return error;
    }
    return new Error("Erro ao executar a ação");
  }
}
