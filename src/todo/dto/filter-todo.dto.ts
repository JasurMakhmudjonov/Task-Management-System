import { Priority, Status } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class FilterTodoDto {
  @IsOptional()
  @IsEnum(SortOrder, { message: 'sortBy must be asc or desc' })
  sortBy?: SortOrder;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  dueDate?: Date;

  @IsOptional()
  @IsString()
  categoryId?: string;
}
