import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { User, UserEdit } from '@pdr-cloud-assessment/shared';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  findAll(@Query('page') page: number): User[] {
    return this.service.findAll(page);
  }

  @Get(':id')
  find(@Param('id') id: User['id']): User {
    return this.service.find(id);
  }

  @Post()
  create(@Body() user: UserEdit): User {
    return this.service.create(user);
  }

  @Put(':id')
  update(@Param('id') id: User['id'], @Body() user: UserEdit): User {
    return this.service.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: User['id']): void {
    return this.service.delete(id);
  }
}
