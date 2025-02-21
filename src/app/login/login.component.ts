import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: AppService, private router: Router) { }

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = "Username and Password are required.";
      return;
    }

    const loginData = { username: this.username, password: this.password };
    this.apiService.login(loginData).subscribe(
      (response: any) => {
        if (response.message === "user not found") {
          this.errorMessage = "Login failed: User not found.";
          return;
        }

        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      error => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed: ' + (error.message || 'Unknown error');
      }
    );
  }
}
