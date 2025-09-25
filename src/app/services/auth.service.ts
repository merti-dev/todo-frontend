import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  get token(): string | null {
    return localStorage.getItem('token') ?? sessionStorage.getItem('token');
  }
  clearToken() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const t = this.token;
    if (!t) return false;
    try {
      const payload = JSON.parse(atob(t.split('.')[1]));
      const exp = (payload?.exp ?? 0) * 1000;
      return Date.now() < exp - 30_000;
    } catch {
      return false;
    }
  }
}
