import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { GenericRepository } from './Generic.Repository';

@Injectable()
export class UserRepository extends GenericRepository<User>{
    constructor() {
        super('user');
    }

    async getById(id: number): Promise<User> {
        return await this.prisma.user.findUnique({ where: { id: Number(id) } });
    }

    async getByUserName(userName: string): Promise<User> {
        return await this.prisma.user.findUnique({ where: { userName: String(userName) } });
    }
}