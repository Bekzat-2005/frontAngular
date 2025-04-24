import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { HttpClientTestingModule } from '@angular/common/http/testing';

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
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient);
  });

  it("Login create component", () => {
    expect(component).toBeTruthy();
  })

  it('login() дұрыс POST сұранысын жібереді', () => {
    const userData = { username: 'test', password: '1234' };
    const httpSpy = spyOn(httpClient, 'post').and.returnValue(of({ token: 'mock-token' }));
  
    authService.login(userData).subscribe(response => {
      expect(response.token).toBe('mock-token');
    });
  
    expect(httpSpy).toHaveBeenCalledWith(`${authService.api}/login`, userData);
  });

});
