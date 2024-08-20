import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Priority } from '@prisma/client';

export class CreateTodoDto {
  @ApiProperty({ example: 'title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'description' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: 'image.png' })
  @IsOptional()
  @IsString()
  photo: string;

  @ApiPropertyOptional({ example: new Date() })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  dueDate: Date;

  @ApiPropertyOptional({ example: Priority.LOW})
  @IsOptional()
  @IsEnum(Priority)
  @Transform(({ value }) => value.trim())
  priority: Priority;

  @ApiProperty({ example: 'categoryId' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  categoryId: string;
}
