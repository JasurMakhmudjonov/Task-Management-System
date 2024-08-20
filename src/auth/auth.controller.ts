import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import {
  RegisterResponse,
  RegisterBadRequestResponse,
  LoginResponse,
  LoginBadRequestResponse,
} from './auth.response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse(RegisterResponse)
  @ApiOperation({ summary: 'Register for new user' })
  @ApiResponse(RegisterBadRequestResponse)
  async register(@Body() payload: RegisterAuthDto) {
    return this.authService.register(payload);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in and return a JWT token' })
  @ApiResponse(LoginResponse)
  @ApiResponse(LoginBadRequestResponse)
  async login(@Body() payload: LoginAuthDto) {
    return this.authService.login(payload);
  }
}
