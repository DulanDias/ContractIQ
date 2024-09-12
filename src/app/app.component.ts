import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
})
export class AppComponent {
  title = 'ContractIQ';
  isAuthenticated = false; // Track if the user is logged in
  username = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {
    // Check if the user is already authenticated via localStorage or AuthService
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      this.isAuthenticated = true; // If a token is present, set the user as authenticated
    }
  }

  onLogin() {
    // Use AuthService to log in
    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response && response.access_token) {
          this.isAuthenticated = true;
          localStorage.setItem('token', response.access_token); // Store the token in localStorage
          localStorage.setItem('isAuthenticated', 'true'); // Mark user as authenticated
          this.router.navigate(['/']); // Navigate to a secure page after login
        }
      },
      error => {
        alert('Invalid credentials!');
        console.error('Login failed', error);
      }
    );
  }

  onLogout() {
    // Use AuthService to log out
    this.authService.logout();
    this.isAuthenticated = false;
    localStorage.removeItem('token'); // Clear the token from localStorage
    localStorage.removeItem('isAuthenticated'); // Clear authentication status
    this.router.navigate(['/']); // Navigate back to login after logout
  }

  // Function to check if the current route matches the given link
  isActive(route: string): boolean {
    return this.router.url === `/${route}`;
  }
}
