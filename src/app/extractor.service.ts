import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExtractorService {

  private apiUrl = 'http://127.0.0.1:8000/contracts';

  constructor(private http: HttpClient, private authService: AuthService) {}

   // Method to extract information from the contract (PDF file)
   extractContractInfo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    // Retrieve token from localStorage using AuthService
    const token = this.authService.getToken();

    // Add token to Authorization header
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Send POST request to the backend API with the file and Authorization header
    return this.http.post<any>(`${this.apiUrl}/extract`, formData, { headers });
  }
}
