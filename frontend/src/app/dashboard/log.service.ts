import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getLogMetrics(): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { })
      .pipe(
        catchError((error) =>
          throwError(
            () => new Error(error.error.message || 'Authentication failed')
          )
        )
      );
  }
}
