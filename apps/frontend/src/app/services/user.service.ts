import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User, UserEdit, UserSchema } from '@pdr-cloud-assessment/shared';
import { map, Observable } from 'rxjs';

import { API_URL } from '../app.constants';
import { UserListSchema } from '../schemas/user-list.schema';

@Injectable()
export class UserService {
  private readonly http = inject(HttpClient);

  loadUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users`).pipe(
      map((response) => UserListSchema.parse(response)),
    );
  }

  loadUser(id: User['id']): Observable<User> {
    return this.http.get<User>(`${API_URL}/users/${id}`).pipe(
      map((response) => UserSchema.parse(response)),
    );
  }

  createUser(user: UserEdit): Observable<User> {
    return this.http.post<User>(`${API_URL}/users`, user).pipe(
      map((response) => UserSchema.parse(response)),
    );
  }

  updateUser(id: User['id'], user: UserEdit): Observable<User> {
    return this.http.put<User>(`${API_URL}/users/${id}`, user).pipe(
      map((response) => UserSchema.parse(response)),
    );
  }

  deleteUser(id: User['id']): Observable<void> {
    return this.http.delete<void>(`${API_URL}/users/${id}`).pipe(
      map(() => void undefined),
    );
  }
}
