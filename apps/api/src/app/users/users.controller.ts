import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { User, UserEdit, UserEditSchema } from '@pdr-cloud-assessment/shared';

import { EntityNotFoundException } from '../data/data.exceptions';
import { ZodValidationPipe } from './users.pipes';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: User['id']): Promise<User> {
    try {
      return await this.service.find(id);
    } catch (e) {
      this.handleException(e);
    }
  }

  @Post()
  async create(@Body(new ZodValidationPipe(UserEditSchema)) user: UserEdit): Promise<User> {
    return this.service.create(user);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: User['id'],
    @Body(new ZodValidationPipe(UserEditSchema)) user: UserEdit
  ): Promise<User> {
    try {
      return await this.service.update(id, user);
    } catch (e) {
      this.handleException(e);
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: User['id']): Promise<void> {
    try {
      return await this.service.delete(id);
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
