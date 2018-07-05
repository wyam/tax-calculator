import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  signIn(email: string, password: string): Observable<any> {
    const url = `${environment.url}/auth/login`;
    return this.http.post<User>(url, {email, password});
  }
}
