import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  fullname: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  email: string;

  @ApiProperty({ example: 'password123' })
  @MinLength(4)
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'image.png' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  prifileImage: string;
}

