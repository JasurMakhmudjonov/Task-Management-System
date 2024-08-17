import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ApiNoContentResponse } from '@nestjs/swagger';
import { validate as isUuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.users.findMany();
    if (users.length > 0) {
      return users;
    } else {
      throw new BadRequestException('No user found');
    }
  }

  async findOne(id: string) {
    console.log('Received ID:', id); // Log the ID for debugging

    if (!isUuid(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async update(
    id: string,
    { fullname, email, password, profileImage }: UpdateUserDto,
  ) {
    await this.findOne(id);

    return this.prisma.users.update({
      where: { id },
      data: { fullname, email, password, profileImage },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.users.delete({ where: { id } });
    return null;
  }
}
