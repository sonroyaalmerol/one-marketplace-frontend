import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

const baseUrl = `${environment.apiBaseUrl}/users`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(private http: HttpClient, public router: Router) {}
  // Sign-up
  register(user: User): Observable<any> {
    let api = `${baseUrl}/register`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  // Sign-in
  login(user: User): Observable<any> {
    const ret = this.http
      .post<any>(`${baseUrl}/signin`, user)
      .pipe(catchError(this.handleError));

    ret.subscribe((res: any) => {
      localStorage.setItem('access_token', res.token);
      this.getSelfProfile().subscribe((res) => {
        this.currentUser = res;
        this.router.navigateByUrl('/')
      });
    });

    return ret
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigateByUrl('/login')
    }
  }
  getSelfProfile(): Observable<any> {
    let api = `${baseUrl}/self`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${baseUrl}/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}