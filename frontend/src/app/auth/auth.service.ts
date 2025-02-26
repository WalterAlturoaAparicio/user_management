import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as crypto from 'crypto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        catchError((error) =>
          throwError(
            () => new Error(error.error.message || 'Authentication failed')
          )
        )
      );
  }

  register(
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<any> {
    const encryptedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('base64');
    const encryptedConfirmPassword = crypto
      .createHash('sha256')
      .update(confirmPassword)
      .digest('base64');

    return this.http
      .post<any>(`${this.apiUrl}/register`, {
        email,
        password: encryptedPassword,
        confirmPassword: encryptedConfirmPassword,
      })
      .pipe(
        catchError((error) =>
          throwError(
            () => new Error(error.error.message || 'Registration failed')
          )
        )
      );
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }
}
