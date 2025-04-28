import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  public api = 'https://backexpress-3mnu.onrender.com/users'; // МІНЕ ОСЫ!!!

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(this.api); // /users
  }

  createUser(user: any) {
    return this.http.post<any>(this.api, user); // /users
  }

  updateUser(id: string, user: any) {
    return this.http.put<any>(`${this.api}/${id}`, user); // /users/:id
  }

  deleteUser(id: string) {
    return this.http.delete<any>(`${this.api}/${id}`); // /users/:id
  }
}
