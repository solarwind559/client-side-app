import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
// export class LoginComponent {

// }


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { ApiService } from '../api.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   standalone: true,
//   imports: [CommonModule, FormsModule]
// })
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private apiService: AppService, private router: Router) { }

  onLogin() {
    const loginData = { username: this.username, password: this.password };
    this.apiService.login(loginData).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
        // this.router.navigate(['/all-houses']); // Redirect to /all-houses page on successful login
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
