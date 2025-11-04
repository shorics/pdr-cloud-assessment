import { Injectable } from '@nestjs/common';
import { User, UserEdit } from '@pdr-cloud-assessment/shared';

import { EntityNotFoundException } from './data.exceptions';

type Dictionary<K extends string | number | symbol, V> = {
  [id in K]: V | undefined;
};

@Injectable()
export class DataUsersService {
  private data: Dictionary<User['id'], User> = {};
  private currentId = 1;

  findAll(): User[] {
    return Object.values(this.data);
  }

  find(id: User['id']): User {
    const entity = this.data[id];
    if (undefined === entity) {
      throw new EntityNotFoundException(id);
    }

    return { ...entity };
  }

  create(user: UserEdit): User {
    const id = this.currentId;
    const entity = {
      id,
      ...user,
    }

    this.data[id] = entity;

    this.currentId++;

    return { ...entity };
  }

  update(id: User['id'], user: UserEdit): User {
    const entity = this.data[id];
    if (undefined === entity) {
      throw new EntityNotFoundException(id);
    }

    const updated = {
      ...entity,
      ...user,
    }

    this.data[id] = updated;

    return { ...updated };
  }

  delete(id: User['id']): void {
    const entity = this.data[id];
    if (undefined === entity) {
      throw new EntityNotFoundException(id);
    }

    delete this.data[id];
  }
}
