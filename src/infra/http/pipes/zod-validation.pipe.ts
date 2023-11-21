import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, ZodObject } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private schema: ZodObject<any>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new HttpException(
          error.errors[0].message,
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
