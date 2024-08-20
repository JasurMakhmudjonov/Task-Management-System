import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiQuery,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { FilterTodoDto, SortOrder } from './dto/filter-todo.dto';
import { Priority, Status } from '@prisma/client';
import {
  CreateTodoResponse,
  FindAllTodosResponse,
  FindOneTodoResponse,
  UpdateTodoResponse,
  RemoveTodoResponse,
  GetOverviewResponse,
} from './todo.response';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Todos')
@Controller({ version: '1', path: 'todos' })
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse(CreateTodoResponse)
  async create(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    const userId = req.user.id;
    return this.todoService.create(createTodoDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of todos' })
  @ApiQuery({
    name: 'status',
    enum: Status,
    required: false,
    description: 'Filter by status',
  })
  @ApiQuery({
    name: 'priority',
    enum: Priority,
    required: false,
    description: 'Filter by priority',
  })
  @ApiQuery({
    name: 'dueDate',
    type: String,
    required: false,
    description: 'Filter by due date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'sortBy',
    enum: SortOrder,
    required: false,
    description: 'Sort by priority',
  })
  @ApiQuery({
    name: 'categoryId',
    type: String,
    required: false,
    description: 'Filter by category ID',
  })
  @ApiResponse(FindAllTodosResponse)
  async findAll(@Req() req, @Query() filterTodoDto: FilterTodoDto) {
    const userId = req.user.id;
    return this.todoService.findAll(userId, filterTodoDto);
  }

  @Get('overview')
  @ApiOperation({ summary: 'Get an overview of todos by category' })
  @ApiResponse(GetOverviewResponse)
  async getOverview(@Req() req) {
    const userId = req.user.id;
    return this.todoService.getOverview(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single todo by ID' })
  @ApiResponse(FindOneTodoResponse)
  async findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.todoService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo by ID' })
  @ApiResponse(UpdateTodoResponse)
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.todoService.update(id, updateTodoDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse(RemoveTodoResponse)
  async remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    await this.todoService.remove(id, userId);
  }
}
