import { Module } from '@nestjs/common';
import { PostModule } from './Modules/post.module';
import { UserModule } from './Modules/user.module';
import { AuthModule } from './Modules/auth.module';
import { PassportModule } from '@nestjs/passport';
import { HealthController } from './Controllers/Health.Controller';

@Module({
  imports: [PostModule, UserModule, AuthModule, PassportModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
