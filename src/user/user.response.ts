// user.response.ts

import { ApiResponseOptions } from '@nestjs/swagger';

export class UserResponse {
  static getProfileSuccessResponse: ApiResponseOptions = {
    status: 200,
    description: 'User profile retrieved successfully',
    schema: {
      example: {
        message: 'User found',
        data: {
          id: 'string',
          email: 'user@example.com',
          fullname: 'John Doe',
          profileImage: 'url-to-profile-image',
          task: [
            {
              id: 'string',
              title: 'Task title',
              description: 'Task description',
              status: 'TO_DO',
              dueDate: '2024-08-20',
              categories: [
                {
                  id: 'string',
                  name: 'Category name',
                },
              ],
            },
          ],
        },
      },
    },
  };

  static findOneSuccessResponse: ApiResponseOptions = {
    status: 200,
    description: 'User profile retrieved successfully',
    schema: {
      example: {
        message: 'User found',
        data: {
          id: 'string',
          email: 'user@example.com',
          fullname: 'John Doe',
          profileImage: 'url-to-profile-image',
          task: [
            {
              id: 'string',
              title: 'Task title',
              description: 'Task description',
              status: 'TO_DO',
              dueDate: '2024-08-20',
              categories: [
                {
                  id: 'string',
                  name: 'Category name',
                },
              ],
            },
          ],
        },
      },
    },
  };

  static updateSuccessResponse: ApiResponseOptions = {
    status: 200,
    description: 'User profile updated successfully',
    schema: {
      example: {
        message: 'User updated successfully',
        data: {
          id: 'string',
          email: 'user@example.com',
          fullname: 'John Doe',
          profileImage: 'url-to-profile-image',
        },
      },
    },
  };

  

  static forbiddenResponse: ApiResponseOptions = {
    status: 403,
    description: 'Forbidden: You do not have permission to access this resource',
    schema: {
      example: {
        statusCode: 403,
        message: 'You do not have permission to access this resource',
      },
    },
  };

  static notFoundResponse: ApiResponseOptions = {
    status: 404,
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
      },
    },
  };
}
