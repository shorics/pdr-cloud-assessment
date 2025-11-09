
import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  private schema: ZodType;

  constructor(schema: ZodType) {
    this.schema = schema;
  }

  transform(value: unknown): unknown {
    try {
      return this.schema.parse(value);
    } catch {
      throw new BadRequestException('Validation failed');
    }
  }
}
