import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  UploadFileSuccessResponse,
  UploadFileInvalidResponse,
  UploadFileErrorResponse,
} from './upload.response';

@ApiTags('Uploads')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse(UploadFileSuccessResponse)
  @ApiResponse(UploadFileInvalidResponse)
  @ApiResponse(UploadFileErrorResponse)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 10, // 10 MB
          }),
          new FileTypeValidator({
            fileType: '.(png|jpg|svg|heic|gif|webp|pdf|jpeg)',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.uploadService.create({
      fileName: file.originalname,
      fileType: file.mimetype,
      body: file.buffer,
    });
  }
}
