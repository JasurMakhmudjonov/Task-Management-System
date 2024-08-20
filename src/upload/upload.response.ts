import { ApiResponseOptions } from '@nestjs/swagger';

export const UploadFileSuccessResponse: ApiResponseOptions = {
  status: 201,
  description: 'File successfully uploaded',
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the uploaded file',
      },
    },
  },
};

export const UploadFileInvalidResponse: ApiResponseOptions = {
  status: 400,
  description: 'Invalid file format or size',
  schema: {
    type: 'object',
    properties: {
      statusCode: {
        type: 'number',
      },
      message: {
        type: 'string',
      },
      error: {
        type: 'string',
      },
    },
  },
};

export const UploadFileErrorResponse: ApiResponseOptions = {
  status: 500,
  description: 'Internal server error',
  schema: {
    type: 'object',
    properties: {
      statusCode: {
        type: 'number',
      },
      message: {
        type: 'string',
      },
      error: {
        type: 'string',
      },
    },
  },
};
