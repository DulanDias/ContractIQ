import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule,      
    FormsModule,
    RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})

export class LandingComponent {

  constructor(private router: Router) {}
  
  // Function to check if the current route matches the given link
  isActive(route: string): boolean {
    return this.router.url === `/${route}`;
  }
}
