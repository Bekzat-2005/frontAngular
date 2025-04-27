import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { UserService } from '../user.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUsers', 'createUser', 'updateUser', 'deleteUser']);
    // ❗ getUsers шақырғанда бос массив қайтаратын қылып береміз
    spy.getUsers.and.returnValue(of([]));  

    await TestBed.configureTestingModule({
      imports: [AdminComponent, CommonModule, FormsModule],
      providers: [{ provide: UserService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    fixture.detectChanges(); // ❗ Осы жерде getUsers() шақырылады
  });

  it('should create AdminComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on getUsers', () => {
    const mockUsers = [{ _id: '1', username: 'testuser', role: 'user' }];
    userServiceSpy.getUsers.and.returnValue(of(mockUsers));

    component.getUsers();

    expect(userServiceSpy.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
  });

  it('should create a new user', () => {
    const newUser = { username: 'newuser', password: '123456', role: 'user' };
    component.newUser = { ...newUser };

    userServiceSpy.createUser.and.returnValue(of(newUser));
    userServiceSpy.getUsers.and.returnValue(of([]));

    component.createUser();

    expect(userServiceSpy.createUser).toHaveBeenCalledWith(newUser);
  });

  it('should delete a user', () => {
    spyOn(window, 'confirm').and.returnValue(true); // confirm always true
    userServiceSpy.deleteUser.and.returnValue(of({}));
    userServiceSpy.getUsers.and.returnValue(of([]));

    component.deleteUser('1');

    expect(userServiceSpy.deleteUser).toHaveBeenCalledWith('1');
  });

  it('should update a user', () => {
    const editingUser = { _id: '1', username: 'edited', role: 'admin' };
    component.editingUser = { ...editingUser };

    userServiceSpy.updateUser.and.returnValue(of({}));
    userServiceSpy.getUsers.and.returnValue(of([]));

    component.saveUpdate();

    expect(userServiceSpy.updateUser).toHaveBeenCalledWith('1', {
      username: 'edited',
      role: 'admin'
    });
  });
});
