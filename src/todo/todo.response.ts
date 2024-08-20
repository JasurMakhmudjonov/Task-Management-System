import { ApiResponseOptions } from '@nestjs/swagger';
import { Status, Priority } from '@prisma/client';

export const CreateTodoResponse: ApiResponseOptions = {
  status: 201,
  description: 'Todo created successfully',
  schema: {
    type: 'object',
    properties: {
      message: { type: 'string' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          photo: { type: 'string' },
          dueDate: { type: 'string', format: 'date' },
          priority: { type: 'string', enum: Object.values(Priority) },
          status: { type: 'string', enum: Object.values(Status) },
          categories: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
};

export const FindAllTodosResponse: ApiResponseOptions = {
  status: 200,
  description: 'List of todos',
  schema: {
    type: 'object',
    properties: {
      message: { type: 'string' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            photo: { type: 'string' },
            dueDate: { type: 'string', format: 'date' },
            priority: { type: 'string', enum: Object.values(Priority) },
            status: { type: 'string', enum: Object.values(Status) },
            categories: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                },
              },
            },
          },
        },
      },
      overview: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            categoryId: { type: 'string' },
            categoryName: { type: 'string' },
            toDoCount: { type: 'number' },
            inProgressCount: { type: 'number' },
            completedCount: { type: 'number' },
          },
        },
      },
    },
  },
};

export const FindOneTodoResponse: ApiResponseOptions = {
  status: 200,
  description: 'Single todo details',
  schema: {
    type: 'object',
    properties: {
      message: { type: 'string' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          photo: { type: 'string' },
          dueDate: { type: 'string', format: 'date' },
          priority: { type: 'string', enum: Object.values(Priority) },
          status: { type: 'string', enum: Object.values(Status) },
          userId: { type: 'string' },
          categories: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
              },
            },
          },
        },
      },
      overview: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            categoryId: { type: 'string' },
            categoryName: { type: 'string' },
            toDoCount: { type: 'number' },
            inProgressCount: { type: 'number' },
            completedCount: { type: 'number' },
          },
        },
      },
    },
  },
};

export const UpdateTodoResponse: ApiResponseOptions = {
  status: 200,
  description: 'Todo updated successfully',
  schema: {
    type: 'object',
    properties: {
      message: { type: 'string' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          photo: { type: 'string' },
          dueDate: { type: 'string', format: 'date' },
          priority: { type: 'string', enum: Object.values(Priority) },
          status: { type: 'string', enum: Object.values(Status) },
          categories: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
};

export const RemoveTodoResponse: ApiResponseOptions = {
  status: 204,
  description: 'Todo deleted successfully',
  schema: {
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  },
};

export const GetOverviewResponse: ApiResponseOptions = {
  status: 200,
  description: 'Overview of todos',
  schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        categoryId: { type: 'string' },
        categoryName: { type: 'string' },
        toDoCount: { type: 'number' },
        inProgressCount: { type: 'number' },
        completedCount: { type: 'number' },
      },
    },
  },
};
