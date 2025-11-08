import { Injectable } from '@nestjs/common';
import { User, UserEdit } from '@pdr-cloud-assessment/shared';
import fastq from 'fastq';

import { saveJsonFile } from './data-users.utils';
import { EntityNotFoundException } from './data.exceptions';

type Dictionary<K extends string | number | symbol, V> = {
  [id in K]: V | undefined;
};

interface SaveTask {
  action: () => void,
}

@Injectable()
export class DataUsersService {
  private currentId: number;
  private readonly data: Dictionary<User['id'], User>;
  private readonly sourceFile: string;
  private readonly saveQueue = fastq.promise(this, this.saveWorker, 1);

  constructor(userList: User[] = [], usersFile: string) {
    this.data = this.listToDict(userList);
    this.currentId = this.getNextId();
    this.sourceFile = usersFile;
  }

  async findAll(): Promise<User[]> {
    return Object.values(this.data);
  }

  async find(id: User['id']): Promise<User> {
    const entity = this.data[id];
    if (undefined === entity) {
      throw new EntityNotFoundException(id);
    }

    return { ...entity };
  }

  async create(user: UserEdit): Promise<User> {
    const id = this.currentId;
    const entity = {
      id,
      ...user,
    }

    await this.saveQueue.push({
      action: () => {
        this.data[id] = entity;
        this.currentId++;
    }});

    return { ...entity };
  }

  async update(id: User['id'], user: UserEdit): Promise<User> {
    const entity = this.data[id];
    if (undefined === entity) {
      throw new EntityNotFoundException(id);
    }

    const updated = {
      ...entity,
      ...user,
    }

    await this.saveQueue.push(
      { action: () => this.data[id] = updated }
    );

    return { ...updated };
  }

  async delete(id: User['id']): Promise<void> {
    const entity = this.data[id];
    if (undefined === entity) {
      throw new EntityNotFoundException(id);
    }

    await this.saveQueue.push(
      { action: () => delete this.data[id] }
    );
  }

  private listToDict(userList: User[]): Dictionary<User['id'], User> {
    return userList.reduce((dict, user) => {
      dict[user.id] = user;
      return dict;
    }, {});
  }

  private getNextId(): User['id'] {
    const sortedIdList = Object.keys(this.data).sort(
      (a, b) => a.localeCompare(b, undefined, { numeric: true })
    );
    const lastId = Number(sortedIdList.slice(-1)[0]) || 0;

    return lastId + 1;
  }

  private async save(): Promise<void> {
    const userList = Object.values(this.data);

    return saveJsonFile(this.sourceFile, userList);
  }

  private async saveWorker(task: SaveTask): Promise<void> {
    task.action();
    await this.save();
  }
}
