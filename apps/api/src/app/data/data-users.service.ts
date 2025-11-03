import { Injectable } from '@nestjs/common';
import { User, UserEdit } from '@pdr-cloud-assessment/shared';

type Dictionary<K extends string | number | symbol, V> = {
  [id in K]: V | undefined;
};

@Injectable()
export class DataUsersService {
  private data: Dictionary<User['id'], User> = {};
  private currentId = 1;

  findAll(page: number): User[] {
    const size = 25;
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;

    return Object.values(this.data)
      .slice(startIndex, endIndex)
      .map((o) => ({ ...o }));
  }

  find(id: User['id']): User | undefined {
    const entity = this.data[id];
    if (undefined === entity) {
      return undefined;
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

    return { ...entity };
  }

  update(id: User['id'], user: UserEdit): User {
    const entity = this.data[id];
    if (undefined === entity) {
      throw new Error('Not found');
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
      throw new Error('Not found');
    }

    delete this.data[id];
  }
}
