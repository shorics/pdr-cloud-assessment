import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User, UserEdit } from '@pdr-cloud-assessment/shared';
import { map, Observable } from 'rxjs';

@Injectable()
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000';

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/users`);
  }

  loadUser(id: User['id']): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/users/${id}`);
  }

  createUser(user: UserEdit): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/users`, user);
  }

  updateUser(id: User['id'], user: UserEdit): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/users/${id}`, user);
  }

  deleteUser(id: User['id']): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/users/${id}`).pipe(
      map(() => void undefined),
    );
  }
}
