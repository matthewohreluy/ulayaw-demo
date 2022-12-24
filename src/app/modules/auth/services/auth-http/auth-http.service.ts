import { IloginResponse } from './../../components/login/login.model';
import { IRegisterRequest, User } from './../../components/registration/register.model';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../../../shared/models/user.model';
import { environment } from '../../../../../environments/environment';

const API_USERS_URL = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  // public methods
  login({email, password}: {email: string, password: string}): Observable<any> {
    return this.http.post<IloginResponse>(`${API_USERS_URL}/login`, {
      email,
      password,
    });
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: IRegisterRequest): Observable<User> {
    return this.http.put<User>(`${API_USERS_URL}/signup`, user).pipe(
      map((response: any)=>response.user)
    );
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserModel>(`${API_USERS_URL}/me`, {
      headers: httpHeaders,
    });
  }
}
