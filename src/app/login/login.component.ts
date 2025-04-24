import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('LOGIN:', this.username, this.password);
    debugger;
    this.authService.login({username: this.username, password: 'bug'}).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/admin'])
      }
    })
  }


 }
