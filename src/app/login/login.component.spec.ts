import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule, FormsModule, HttpClientTestingModule],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('Логин жасалды', () => {
    expect(component).toBeTruthy();
  });

  it('Логин жасап тұр', () => {
    const spy = spyOn(authService, 'login').and.returnValue(of({ token: 'test-token' }));
    component.username = 'test';
    component.password = 'test';
    component.login();
    expect(spy).toHaveBeenCalledWith({ username: 'test', password: 'test' });
  });

});
