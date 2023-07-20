import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessToken: string;

  constructor() { 
    this.accessToken = localStorage.getItem('accessToken') || '';
  }

  getAuthorizationHeader(){
    return `Bearer ${this.accessToken}`;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  logout(): void {
    this.accessToken = '';
    localStorage.removeItem('accessToken');
  }
}
