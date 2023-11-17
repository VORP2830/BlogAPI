import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UnitOfWork } from 'src/Repositories/UnitOfWok';
import { UserService } from 'src/Services/User.Service';
import { JwtStrategy } from 'src/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtStrategy, UserService, UnitOfWork],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
