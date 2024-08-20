import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [CategoryController],
  providers: [CategoryService, AuthGuard],
  exports: [CategoryService],
})
export class CategoryModule {}
