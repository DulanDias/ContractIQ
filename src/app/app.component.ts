import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,      
    FormsModule,
    RouterModule,
  ]
})
export class AppComponent {
  title = 'ContractIQ';
  isAuthenticated = false; // Track if the user is logged in
  username = 'admin';
  password = 'root';

  constructor(private router: Router) {}

  onLogin() {
    if (this.username === 'admin' && this.password === 'root') {
      this.isAuthenticated = true;
      this.router.navigate(['/']);
    } else {
      alert('Invalid credentials!');
    }
  }

  onLogout() {
    this.isAuthenticated = false;
    this.username = '';
    this.password = '';
  }
}
