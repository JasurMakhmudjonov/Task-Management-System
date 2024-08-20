// upload.responses.ts
import { ApiResponseOptions } from '@nestjs/swagger';

export const UploadFileSuccessResponse: ApiResponseOptions = {
  status: 200,
  description: 'File uploaded successfully',
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
  description: 'Invalid file type or size',
  schema: {
    type: 'object',
    properties: {
      statusCode: {
        type: 'integer',
        example: 400,
      },
      message: {
        type: 'string',
        example: 'Invalid file type or size',
      },
      error: {
        type: 'string',
        example: 'Bad Request',
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
        type: 'integer',
        example: 500,
      },
      message: {
        type: 'string',
        example: 'Internal server error',
      },
      error: {
        type: 'string',
        example: 'Internal Server Error',
      },
    },
  },
};
