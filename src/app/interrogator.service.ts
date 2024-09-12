import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterrogatorService {
  private apiUrl = 'http://127.0.0.1:8000/contracts/interrogate';

  constructor(private http: HttpClient) {}

  interrogateDocument(file: File, query: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('query', query);

    return this.http.post<any>(this.apiUrl, formData);
  }
}
