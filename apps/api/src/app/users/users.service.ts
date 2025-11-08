import { Injectable } from '@nestjs/common';
import { User, UserEdit } from '@pdr-cloud-assessment/shared';

import { DataUsersService } from '../data/data-users.service';

@Injectable()
export class UsersService {
  constructor(private readonly service: DataUsersService) {}

  async findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  async find(id: User['id']): Promise<User> {
    return this.service.find(id);
  }

  async create(user: UserEdit): Promise<User> {
    return this.service.create(user);
  }

  async update(id: User['id'], user: UserEdit): Promise<User> {
    return this.service.update(id, user);
  }

  async delete(id: User['id']): Promise<void> {
    return this.service.delete(id);
  }
}
