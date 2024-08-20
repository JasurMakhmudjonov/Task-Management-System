import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { Status } from '@prisma/client';

@Injectable()
export class TodoService {
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

  private async updateExpiredTasks() {
    const now = new Date();
    await this.prisma.todo.updateMany({
      where: {
        dueDate: {
          lt: now,
        },
        status: {
          not: Status.COMPLETED,
        },
      },
      data: {
        status: Status.EXPIRED,
      },
    });
  }

  async create(createTodoDto: CreateTodoDto, userId: string) {
    await this.validateUser(userId);

    const todo = await this.prisma.todo.create({
      data: {
        ...createTodoDto,
        userId,
      },
      include: {
        categories: true,
      },
    });
    return { message: 'Todo created successfully', data: todo };
  }

  async findAll(userId: string, filterTodoDto: FilterTodoDto) {
    await this.validateUser(userId);

    await this.updateExpiredTasks(); 

    const { status, priority, dueDate, sortBy, categoryId } = filterTodoDto;

    const todos = await this.prisma.todo.findMany({
      where: {
        userId,
        ...(status && { status }),
        ...(priority && { priority }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(categoryId && { categoryId }),
      },
      orderBy: {
        priority: sortBy || 'asc',
      },
      select: {
        id: true,
        title: true,
        description: true,
        photo: true,
        dueDate: true,
        priority: true,
        status: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const overview = await this.getOverview(userId);

    return { message: 'All todos', data: todos };
  }

  async findOne(id: string, userId: string) {
    await this.validateUser(userId);

    await this.updateExpiredTasks(); 

    const todo = await this.prisma.todo.findFirst({
      where: { id, userId },
      select: {
        id: true,
        title: true,
        description: true,
        photo: true,
        dueDate: true,
        priority: true,
        status: true,
        userId: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!todo) {
      throw new NotFoundException('Todo not found or does not belong to you');
    }

    const overview = await this.getOverview(userId);

    return { message: 'Todo found', data: todo, overview };
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, userId: string) {
    await this.validateUser(userId);

    const todo = await this.findOne(id, userId);

    if (todo.data.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this task',
      );
    }

    const updatedTodo = await this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });

    if (updateTodoDto.dueDate && new Date(updateTodoDto.dueDate) < new Date()) {
      await this.prisma.todo.update({
        where: { id },
        data: { status: Status.EXPIRED },
      });
    }

    return { message: 'Todo updated successfully', data: updatedTodo };
  }

  async remove(id: string, userId: string) {
    await this.validateUser(userId);

    await this.findOne(id, userId);

    await this.prisma.todo.delete({ where: { id } });
    return { message: 'Todo deleted successfully' };
  }

  async getOverview(userId: string) {
    await this.validateUser(userId);

    const overview = await this.prisma.category.findMany({
      where: {
        task: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        task: {
          select: {
            status: true,
          },
          where: { userId },
        },
      },
    });

    return overview.map((category) => ({
      categoryId: category.id,
      categoryName: category.name,
      toDoCount: category.task.filter((todo) => todo.status === Status.TO_DO)
        .length,
      inProgressCount: category.task.filter(
        (todo) => todo.status === Status.IN_PROGRESS,
      ).length,
      completedCount: category.task.filter(
        (todo) => todo.status === Status.COMPLETED,
      ).length,
      expiredCount: category.task.filter((todo) => todo.status === Status.EXPIRED)
        .length,
    }));
  }
}
