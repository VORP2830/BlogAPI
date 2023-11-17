import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserController } from 'src/Controllers/User.Controller';
import { UnitOfWork } from 'src/Repositories/UnitOfWok';
import { UserService } from 'src/Services/User.Service';

@Module({
  controllers: [UserController],
  providers: [UserService, UnitOfWork],
  imports: [PassportModule],
})
export class UserModule {}
