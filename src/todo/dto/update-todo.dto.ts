import { IsEnum, IsOptional } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';
import { Status } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTodoDto extends CreateTodoDto {


    
  @ApiPropertyOptional({ example: Status.TO_DO })
  @IsOptional()
  @IsEnum(Status)
  status: Status;

}
