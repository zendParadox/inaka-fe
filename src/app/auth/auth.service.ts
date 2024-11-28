import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Observable,
  tap,
  finalize,
  BehaviorSubject,
  catchError,
  throwError,
} from 'rxjs';
import { environment } from '../../../environtments/environtment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

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

  login(email: string, password: string, token: string): Observable<any> {
    this.loadingSubject.next(true);
    return this.http
      .post<any>(`${this.apiUrl}/login`, {
        email,
        password,
        recaptcha: token,
      }) // Kirim token sebagai 'recaptcha'
      .pipe(
        tap((response) => {
          if (response.accessToken) {
            console.log('response: ', response);
            localStorage.setItem('accessToken', response.accessToken);
          }
        }),
        catchError((err) => {
          console.error('Login error:', err);
          return throwError(err);
        }),
        finalize(() => {
          this.loadingSubject.next(false);
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
