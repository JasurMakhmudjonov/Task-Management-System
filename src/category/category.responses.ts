import { ApiResponse } from '@nestjs/swagger';

export const CreateCategoryResponse = {
  status: 201,
  description: 'Category successfully created',
  type: Object,
  schema: {
    example: {
      message: 'Category created successfully',
      data: {
        id: 'e6e53b39-2e74-4ec3-8f9e-b7a3e47f2c2e',
        name: 'New Category',
        userId: 'd5b50a43-3c1f-4e1b-9bba-1d5c1b7e8318',
        createdAt: '2024-08-20T08:00:00Z',
        updatedAt: '2024-08-20T08:00:00Z',
      },
    },
  },
};

export const GetAllCategoriesResponse = {
  status: 200,
  description: 'List of all categories',
  type: Object,
  schema: {
    example: {
      message: 'All categories',
      data: [
        {
          id: 'e6e53b39-2e74-4ec3-8f9e-b7a3e47f2c2e',
          name: 'Category 1',
          userId: 'd5b50a43-3c1f-4e1b-9bba-1d5c1b7e8318',
          createdAt: '2024-08-20T08:00:00Z',
          updatedAt: '2024-08-20T08:00:00Z',
        },
        {
          id: 'c1a6e5d9-7d23-4f92-9b80-16a72f098b45',
          name: 'Category 2',
          userId: 'd5b50a43-3c1f-4e1b-9bba-1d5c1b7e8318',
          createdAt: '2024-08-20T08:00:00Z',
          updatedAt: '2024-08-20T08:00:00Z',
        },
      ],
    },
  },
};

export const GetCategoryByIdResponse = {
  status: 200,
  description: 'Category retrieved successfully',
  type: Object,
  schema: {
    example: {
      message: 'Category found',
      data: {
        id: 'e6e53b39-2e74-4ec3-8f9e-b7a3e47f2c2e',
        name: 'Category 1',
        userId: 'd5b50a43-3c1f-4e1b-9bba-1d5c1b7e8318',
        createdAt: '2024-08-20T08:00:00Z',
        updatedAt: '2024-08-20T08:00:00Z',
      },
    },
  },
};

export const UpdateCategoryResponse = {
  status: 200,
  description: 'Category successfully updated',
  type: Object,
  schema: {
    example: {
      message: 'Category updated successfully',
      data: {
        id: 'e6e53b39-2e74-4ec3-8f9e-b7a3e47f2c2e',
        name: 'Updated Category',
        userId: 'd5b50a43-3c1f-4e1b-9bba-1d5c1b7e8318',
        createdAt: '2024-08-20T08:00:00Z',
        updatedAt: '2024-08-20T08:00:00Z',
      },
    },
  },
};

export const DeleteCategoryResponse = {
  status: 204,
  description: 'Category successfully deleted',
  type: Object,
  schema: {
    example: {
      message: 'Category deleted successfully',
    },
  },
};
