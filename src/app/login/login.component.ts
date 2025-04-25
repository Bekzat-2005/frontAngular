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
    const user = {
      username: this.username,
      password: this.password
    };
    
    this.authService.login(user).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/admin'])
      }
    })
  }
 }
