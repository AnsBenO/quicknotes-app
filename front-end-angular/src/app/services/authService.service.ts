import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoginResponse } from '../types/login-response';
import { SignupResponse } from '../types/signup-response';
import { LogoutResponse } from '../types/logout-response';

const API_URL = 'http://localhost:3003/api/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(
    !!localStorage.getItem('authToken')
  );
  public isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('authToken');
    this.loggedIn.next(!!token);
  }

  loginUser(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_URL}/login`, { username, password })
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            this.loggedIn.next(true);
          }
        })
      );
  }

  signUpUser(
    username: string,
    email: string,
    password: string
  ): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${API_URL}/signup`, {
      username,
      email,
      password,
    });
  }

  logoutUser(): Observable<LogoutResponse> {
    return this.http
      .post<LogoutResponse>(`${API_URL}/logout`, {})
      .pipe(tap({ next: () => this.loggedIn.next(false) }));
  }
}
