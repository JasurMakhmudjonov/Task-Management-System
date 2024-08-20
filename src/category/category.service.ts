import {
  BadRequestException,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  private async validateUser(userId: string) {
    const existsUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existsUser) {
      throw new NotFoundException('User not found');
    }
    return existsUser;
  }

  async create(createCategoryDto: CreateCategoryDto, userId: string) {
    await this.validateUser(userId);

    const category = await this.prisma.category.create({
      data: {
        ...createCategoryDto,
        userId,
      },
    });

    return { message: 'Category created successfully', data: category };
  }

  async findAll(userId: string) {
    await this.validateUser(userId);

    const allCategories = await this.prisma.category.findMany({
      where: { userId },
    });
    if (allCategories.length === 0) {
      throw new NotFoundException('Category not found');
    }
    return { message: 'All categories', data: allCategories };
  }

  async findOne(id: string, userId: string) {
    await this.validateUser(userId);

    const category = await this.prisma.category.findUnique({
      where: { id, userId },
    });
    if (category.userId !== userId) {
      throw new BadRequestException(
        'Category not found or does not belong to you',
      );
    }
    return { message: 'Category found', data: category };
  }

  async update(id: string, name: string, userId: string) {
    await this.validateUser(userId);

    const category = await this.findOne(id, userId);

    if (category.data.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this category',
      );
    }

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: { name },
    });

    return { message: 'Category updated successfully', data: updatedCategory };
  }

  async remove(id: string, userId: string) {
    await this.validateUser(userId);

    const category = await this.findOne(id, userId);

    if (category.data.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this category',
      );
    }
    await this.prisma.category.delete({ where: { id } });
    return { message: 'Category deleted successfully' };
  }
}
