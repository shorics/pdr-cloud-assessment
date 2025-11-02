import { Injectable } from '@nestjs/common';
import { User, UserEdit } from '@pdr-cloud-assessment/shared';

@Injectable()
export class UsersService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  findAll(page: number): User[] {
    return [
      this.find(page),
    ];
  }

  find(id: User['id']): User {
    return {
      id,
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'test@email.test',
      phoneNumber: '213213',
      birthDate: '2025-12-24',
      role: 'admin',
    }
  }

  create(user: UserEdit): User {
    return {
      id: 101,
      ...user,
    }
  }

  update(id: User['id'], user: UserEdit): User {
    return {
      id,
      ...user,
    }
  }

  delete(id: User['id']): void {
    return;
  }
}
