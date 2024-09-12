import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000'; // FastAPI backend URL
  private tokenSubject: BehaviorSubject<string | null>;
  public token: Observable<string | null>;

  constructor(private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string | null>(
      localStorage.getItem('token')
    );
    this.token = this.tokenSubject.asObservable();
  }

  // Getter for token value
  public get tokenValue(): string | null {
    return this.tokenSubject.value;
  }

  // Login method to authenticate and store token
  login(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http
      .post(`${this.apiUrl}/token`, body.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
      .pipe(
        map((response: any) => {
          if (response && response.access_token) {
            // Store the token in localStorage
            localStorage.setItem('token', response.access_token);
            this.tokenSubject.next(response.access_token);
          }
          return response;
        })
      );
  }

  // Logout method to clear token
  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }
}
