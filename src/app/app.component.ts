import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AppService } from './app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client-side-app';

  constructor(public authService: AppService, public router: Router) { }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    console.log('Access token has been deleted.');
    this.router.navigate(['/login']);
  }
}
