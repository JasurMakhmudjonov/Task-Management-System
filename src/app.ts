import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UploadModule,
    AuthModule,
    UserModule,
    CategoryModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
