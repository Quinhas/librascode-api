import { HttpException, HttpStatus } from '@nestjs/common';

import { env } from '@infra/env';

export class AppException extends HttpException {
  constructor({
    message,
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    errorData,
  }: {
    message: string;
    statusCode: HttpStatus;
    errorData?: Record<string, unknown>;
  }) {
    if (env.NODE_ENV === 'development') {
      console.log({ message, statusCode, errorData });
    }

    super(message, statusCode);
  }
}
