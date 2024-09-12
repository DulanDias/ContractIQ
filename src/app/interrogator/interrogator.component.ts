import { Component } from '@angular/core';
import { InterrogatorService } from '../interrogator.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-interrogator',
  standalone: true, 
  templateUrl: './interrogator.component.html',
  styleUrls: ['./interrogator.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
})
export class InterrogatorComponent {
  selectedFile: File | null = null;
  query: string = '';
  result: string | null = null;
  isDragging: boolean = false;
  loading: boolean = false; 

  constructor(private interrogatorService: InterrogatorService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onDragOver(event: any): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: any): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: any): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  onSubmit(): void {
    if (this.selectedFile && this.query) {

      this.loading = true;

      this.interrogatorService.interrogateDocument(this.selectedFile, this.query).subscribe(
        (response) => {
          this.result = response.answer;
          this.loading = false;
        },
        (error) => {
          console.error('Error:', error);
          this.result = 'Error processing your request.';
          this.loading = false;
        }
      );
    } else {
      alert('Please upload a file and enter a query.');
    }
  }

  onClear(): void {
    // Clear the file input, query, and result
    this.selectedFile = null;
    this.query = '';
    this.result = null;
  }
}