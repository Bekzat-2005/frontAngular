import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  newUser = { username: '', password: '', role: 'user' };
  editingUser: any = null; // 🔥 Жаңарту үшін сақтайтын объект

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  createUser() {
    if (this.newUser.username && this.newUser.password) {
      this.userService.createUser(this.newUser).subscribe(() => {
        this.newUser = { username: '', password: '', role: 'user' };
        this.getUsers();
      });
    }
  }

  deleteUser(id: string) {
    if (confirm('Өшіруге сенімдісің бе?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.getUsers();
      });
    }
  }

  // 🔥 Осы жер жаңарту процесі
  startEdit(user: any) {
    this.editingUser = { ...user }; // көшірме жасау
  }

  saveUpdate() {
    this.userService.updateUser(this.editingUser._id, {
      username: this.editingUser.username,
      role: this.editingUser.role
    }).subscribe(() => {
      this.editingUser = null;
      this.getUsers();
    });
  }

  cancelEdit() {
    this.editingUser = null;
  }
}
