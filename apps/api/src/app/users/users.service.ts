import { Injectable } from '@nestjs/common';
import { User, UserEdit } from '@pdr-cloud-assessment/shared';

import { DataUsersService } from '../data/data-users.service';

@Injectable()
export class UsersService {
  constructor(private readonly service: DataUsersService) {}

  findAll(): User[] {
    return this.service.findAll();
  }

  find(id: User['id']): User {
    return this.service.find(id);
  }

  create(user: UserEdit): User {
    return this.service.create(user);
  }

  update(id: User['id'], user: UserEdit): User {
    return this.service.update(id, user);
  }

  delete(id: User['id']): void {
    this.service.delete(id);
  }
}
