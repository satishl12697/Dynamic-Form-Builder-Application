import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  public currentUser: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`);
  }

  setUser(user: any) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    }
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
