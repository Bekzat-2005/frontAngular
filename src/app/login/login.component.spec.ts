import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { response } from 'express';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let httpClient: HttpClient; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule, FormsModule, HttpClientTestingModule],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
  });

  it("login have component?", () => {
    expect(component).toBeTruthy();
  })

  it("Login() post method and url", () => {
    const userData = {username: 'test', password: '123456'}
    const httpSpy = spyOn(httpClient, 'post').and.returnValue(of({token: 'token'}))

    authService.login(userData).subscribe(responce => {
      expect(responce.token).toBe('token')
    })

    expect(httpSpy).toHaveBeenCalledWith(`${authService.api}/login`, userData);

  })
  
});
