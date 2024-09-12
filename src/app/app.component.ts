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
    FormsModule,
    RouterModule,
    CommonModule
  ]
})
export class AppComponent {
  title = 'ContractIQ';
  isAuthenticated = false; // Track if the user is logged in
  username = '';
  password = '';

  constructor(private router: Router) {}

  // Simulate login logic
  onLogin() {
    if (this.username === 'admin' && this.password === 'password') {
      this.isAuthenticated = true;
    } else {
      alert('Invalid credentials!');
    }
  }
}
