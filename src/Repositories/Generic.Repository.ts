import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GenericRepository<T> {
    protected readonly prisma = new PrismaClient();

    constructor(private modelName: string) { }

    async create(data: T): Promise<T> {
        return await this.prisma[this.modelName].create({
            data,
        });
    }

    async update(data: T): Promise<T> {
        return await this.prisma[this.modelName].update({
            where: { id: Number((data as any).id) },
            data,
        });
    }

    async delete(id: number): Promise<T> {
        return await this.prisma[this.modelName].delete({ where: { id: Number(id) } });
    }
}
