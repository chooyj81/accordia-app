import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const API = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post(`${API}/auth/register`, data);
  }

  login(data: { email: string; password: string }) {
    return this.http
      .post<{ token: string; user: any }>(`${API}/auth/login`, data)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
