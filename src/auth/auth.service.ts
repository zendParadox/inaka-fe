import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(this.apiUrl + '/login', { email, password })
      .pipe(
        tap((response) => {
          // Simpan token di local storage
          if (response.accessToken) {
            console.log('response: ', response);
            localStorage.setItem('accessToken', response.accessToken);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }
}
