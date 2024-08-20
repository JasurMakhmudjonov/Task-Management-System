import { ApiResponseOptions } from '@nestjs/swagger';

export const RegisterResponse: ApiResponseOptions = {
  status: 201,
  description: 'User registered successfully',
  schema: {
    example: {
      message: 'User registered successfully',
      data: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        fullname: 'John Doe',
        email: 'johndoe@example.com',
        profileImage: 'https://example.com/images/johndoe.jpg',
        createdAt: '2024-08-25T14:23:32.982Z',
        updatedAt: '2024-08-25T14:23:32.982Z',
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
  },
};

export const RegisterBadRequestResponse: ApiResponseOptions = {
  status: 400,
  description: 'Bad Request: Email already exists or invalid data',
  schema: {
    example: {
      statusCode: 400,
      message: 'Email already exists',
      error: 'Bad Request',
    },
  },
};

export const LoginResponse: ApiResponseOptions = {
  status: 200,
  description: 'Logged in successfully',
  schema: {
    example: {
      message: 'Logged in successfully',
      data: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        fullname: 'John Doe',
        email: 'johndoe@example.com',
        profileImage: 'https://example.com/images/johndoe.jpg',
        createdAt: '2024-08-25T14:23:32.982Z',
        updatedAt: '2024-08-25T14:23:32.982Z',
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
  },
};

export const LoginBadRequestResponse: ApiResponseOptions = {
  status: 400,
  description: 'Bad Request: Invalid credentials or user not found',
  schema: {
    example: {
      statusCode: 400,
      message: 'Invalid credentials',
      error: 'Bad Request',
    },
  },
};
