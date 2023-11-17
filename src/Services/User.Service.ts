import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { BlogException } from "src/Exceptions/BlogException";
import { UnitOfWork } from "src/Repositories/UnitOfWok";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private readonly secretKey = process.env.JWT_SECRET;
    private readonly saltRounds = 10;

    constructor(private readonly unitOfWork: UnitOfWork) { }

    async getById(id: number): Promise<User> {
        return await this.unitOfWork.userRepository.getById(id);
    }

    async create(data: User): Promise<User> {
        const existingUser = await this.unitOfWork.userRepository.getByUserName(data.userName);
        if (existingUser) throw new BlogException("Nome de usuário já em uso");
        const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);
        const userWithHashedPassword = { ...data, password: hashedPassword };
        return await this.unitOfWork.userRepository.create(userWithHashedPassword);
    }

    async update(data: User): Promise<User> {
        const existingUser = await this.unitOfWork.userRepository.getByUserName(data.userName);
        if (existingUser && existingUser.id !== data.id) throw new BlogException("Nome de usuário já em uso");
        if (data.password) data.password = await bcrypt.hash(data.password, this.saltRounds);
        return await this.unitOfWork.userRepository.update(data);
    }

    async login(data: any): Promise<any> {
        const user = await this.unitOfWork.userRepository.getByUserName(data.userName);
        if (!user) throw new BlogException('Login ou senha inválidos');
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) throw new BlogException('Login ou senha inválidos');
        const authToken = this.createAuthToken(user.id);
        return { user, authToken };
    }

    private createAuthToken(userId: number): string {
        const tokenPayload = { sub: userId };
        const options = { expiresIn: '1h' };
        return jwt.sign(tokenPayload, this.secretKey, options);
    }
}
