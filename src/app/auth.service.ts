import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: { username: string; role: string } | null = null;

  constructor() {}

  // Simula el inicio de sesión
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      this.currentUser = { username: 'admin', role: 'admin' };
      return true;
    }

    if (username === 'user' && password === 'user123') {
      this.currentUser = { username: 'user', role: 'user' };
      return true;
    }

    return false; // login fallido
  }

  logout(): void {
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  getCurrentUser(): { username: string; role: string } | null {
    return this.currentUser;
  }
}
