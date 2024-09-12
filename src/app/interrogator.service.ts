import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class InterrogatorService {
  private apiUrl = 'http://127.0.0.1:8000/contracts';

  constructor(private http: HttpClient, private authService: AuthService) {}

  interrogateDocument(file: File, query: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('query', query);

    // Retrieve token from localStorage using AuthService
    const token = this.authService.getToken();

    // Add token to Authorization header
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.apiUrl}/interrogate`, formData, { headers });
  }
}