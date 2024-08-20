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
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserResponse } from './user.response';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Users')
@Controller({ version: '1', path: 'users' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOperation({
    summary: 'Get the profile of the currently authenticated user',
  })
  @ApiResponse(UserResponse.getProfileSuccessResponse)
  @ApiResponse(UserResponse.notFoundResponse)
  async getProfile(@Req() req) {
    const userId = req.user.id;
    return this.userService.findOne(userId);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update a user profile by authunticated user' })
  @ApiResponse(UserResponse.updateSuccessResponse)
  @ApiResponse(UserResponse.notFoundResponse)
  @ApiResponse(UserResponse.forbiddenResponse)
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    const userId = req.user.id;
    if (userId !== req.user.id) {
      throw new ForbiddenException(
        'You do not have permission to update this profile',
      );
    }

    return this.userService.update(userId, updateUserDto);
  }
}
