import { ApiResponseOptions } from '@nestjs/swagger';

export const CreateCategoryResponse: ApiResponseOptions = {
  status: 201,
  description: 'Category created successfully',
  schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Category created successfully',
      },
      data: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: 'a9f0e5a4-6f5b-4d84-8c8f-0a9b17c0ddad',
          },
          name: {
            type: 'string',
            example: 'Electronics',
          },
          userId: {
            type: 'string',
            format: 'uuid',
            example: 'b2a2e16e-8b4e-4a77-8b4d-4931c70f1d7e',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-08-20T12:34:56.789Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-08-20T12:34:56.789Z',
          },
        },
      },
    },
  },
};

export const GetAllCategoriesResponse: ApiResponseOptions = {
  status: 200,
  description: 'All categories retrieved successfully',
  schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'All categories',
      },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: 'a9f0e5a4-6f5b-4d84-8c8f-0a9b17c0ddad',
            },
            name: {
              type: 'string',
              example: 'Electronics',
            },
            userId: {
              type: 'string',
              format: 'uuid',
              example: 'b2a2e16e-8b4e-4a77-8b4d-4931c70f1d7e',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-20T12:34:56.789Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-20T12:34:56.789Z',
            },
          },
        },
      },
    },
  },
};

export const GetCategoryByIdResponse: ApiResponseOptions = {
  status: 200,
  description: 'Category retrieved successfully',
  schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Category found',
      },
      data: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: 'a9f0e5a4-6f5b-4d84-8c8f-0a9b17c0ddad',
          },
          name: {
            type: 'string',
            example: 'Electronics',
          },
          userId: {
            type: 'string',
            format: 'uuid',
            example: 'b2a2e16e-8b4e-4a77-8b4d-4931c70f1d7e',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-08-20T12:34:56.789Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-08-20T12:34:56.789Z',
          },
        },
      },
    },
  },
};

export const UpdateCategoryResponse: ApiResponseOptions = {
  status: 200,
  description: 'Category updated successfully',
  schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Category updated successfully',
      },
      data: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: 'a9f0e5a4-6f5b-4d84-8c8f-0a9b17c0ddad',
          },
          name: {
            type: 'string',
            example: 'Home Appliances',
          },
          userId: {
            type: 'string',
            format: 'uuid',
            example: 'b2a2e16e-8b4e-4a77-8b4d-4931c70f1d7e',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-08-20T12:34:56.789Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-08-20T12:34:56.789Z',
          },
        },
      },
    },
  },
};

export const DeleteCategoryResponse: ApiResponseOptions = {
  status: 204,
  description: 'Category deleted successfully',
  schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Category deleted successfully',
      },
    },
  },
};
