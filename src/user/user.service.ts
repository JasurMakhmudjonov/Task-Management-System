import { NotFoundException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullname: true,
        password: false,
        profileImage: true,
        task: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            dueDate: true,
            categories: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User found', data: user };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return { message: 'User updated successfully', data: updatedUser };
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }
}
