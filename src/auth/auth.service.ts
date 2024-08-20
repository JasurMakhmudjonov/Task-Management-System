import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  async register({ fullname, email, password, profileImage }: RegisterAuthDto) {
    const existsUser = await this.prisma.user.findUnique({ where: { email } });
    if (existsUser) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPwd = await hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPwd,
        profileImage,
      },
    });
    const token = await this.jwt.signAsync({ id: user.id });

    return { message: 'User registered successfully', data: user, token };
  }

  async login({ email, password }: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    const token = await this.jwt.signAsync({ id: user.id });

    return { message: 'Logged in successfully', data: user, token };
  }
}
