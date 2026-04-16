import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  email: string;
  passwrd: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API_KEY = 'AIzaSyC-B9Vkiz0iKemRq4_H9V8WiTof6V7f70U';
  private TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLogged(): boolean {
    return !!this.getToken();
  }
}