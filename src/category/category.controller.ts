import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  CreateCategoryResponse,
  GetAllCategoriesResponse,
  GetCategoryByIdResponse,
  UpdateCategoryResponse,
  DeleteCategoryResponse,
} from './category.responses';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Categories')
@Controller({ version: '1', path: 'categories' })
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse(CreateCategoryResponse)
  async create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    const userId = req.user.id;
    return this.categoryService.create(createCategoryDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all categories' })
  @ApiResponse(GetAllCategoriesResponse)
  findAll(@Req() req) {
    const userId = req.user.id;
    return this.categoryService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a category by ID' })
  @ApiResponse(GetCategoryByIdResponse)
  findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.categoryService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiResponse(UpdateCategoryResponse)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.categoryService.update(id, updateCategoryDto.name, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiResponse(DeleteCategoryResponse)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    await this.categoryService.remove(id, userId);
    return;
  }
}
