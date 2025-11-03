import { Body, Controller, DefaultValuePipe, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { User, UserEdit, UserEditSchema } from '@pdr-cloud-assessment/shared';

import { EntityNotFoundException } from '../data/data.exceptions';
import { ZodValidationPipe } from './users.pipes';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  findAll(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number): User[] {
    return this.service.findAll(page);
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: User['id']): User {
    try {
      return this.service.find(id);
    } catch (e) {
      this.handleException(e);
    }
  }

  @Post()
  create(@Body(new ZodValidationPipe(UserEditSchema)) user: UserEdit): User {
    return this.service.create(user);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: User['id'],
    @Body(new ZodValidationPipe(UserEditSchema)) user: UserEdit
  ): User {
    try {
      return this.service.update(id, user);
    } catch (e) {
      this.handleException(e);
    }
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: User['id']): void {
    try {
      this.service.delete(id);
    } catch (e) {
      this.handleException(e);
    }
  }

  private handleException(e: unknown): void {
    if (e instanceof EntityNotFoundException) {
      throw new NotFoundException();
    }

    throw e;
  }
}
