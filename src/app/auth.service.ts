import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // public api = 'http://localhost:3000';
  public api = environment.apiUrl;


  constructor(private http: HttpClient) {}

  login(users: any){
    // console.log('Login user:', users); 
    // debugger; 
    return  this.http.post<any>(`${this.api}/login`, users); 
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn(){
    return !!this.getToken();
  }
 

}
