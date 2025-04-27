import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  // private api = 'http://localhost:3000/users'; // 🔥

  public api = 'https://backexpress-3mnu.onrender.com';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(this.api);
  }

  createUser(user: any) {
    return this.http.post<any>(this.api, user);
  }

  updateUser(id: string, user: any) {
    return this.http.put<any>(`${this.api}/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}
