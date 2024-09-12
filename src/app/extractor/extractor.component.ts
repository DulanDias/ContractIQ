import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ExtractorService } from '../extractor.service';

@Component({
  selector: 'app-extractor',
  standalone: true, 
  templateUrl: './extractor.component.html',
  styleUrls: ['./extractor.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
})
export class ExtractorComponent {selectedFile: File | null = null;
  result: string | null = null;
  loading = false;
  isDragging = false;

  constructor(private extractorService: ExtractorService) {}

  // Handle file selection from the drag & drop or file input
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Handle drag over event for drag-and-drop area
  onDragOver(event: any): void {
    event.preventDefault();
    this.isDragging = true;
  }

  // Handle drag leave event for drag-and-drop area
  onDragLeave(event: any): void {
    event.preventDefault();
    this.isDragging = false;
  }

  // Handle file drop event
  onDrop(event: any): void {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Clear the uploaded file and the result
  onClear(): void {
    this.selectedFile = null;
    this.result = null;
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      alert('Please upload a file.');
      return;
    }

    this.loading = true; // Show loading indicator

    // Send the file to the ExtractorService
    this.extractorService.extractContractInfo(this.selectedFile).subscribe(
      (response) => {
        this.result = response.data;  // Extracted data from backend
        this.loading = false;  // Stop loading indicator
      },
      (error) => {
        console.error('Error:', error);
        this.result = 'Error processing your request. Please try again later.';
        this.loading = false;  // Stop loading on error
      }
    );
  }
}