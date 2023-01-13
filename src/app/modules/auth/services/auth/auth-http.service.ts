import { IemailVerificationRequest, IemailVerificationResponse } from '../../components/email-verification/email-verification.model';
import { IloginResponse } from '../../components/login/login.model';
import { IRegisterRequest, User } from '../../components/registration/register.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

const API_USERS_URL = `/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  private user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  userObs: Observable<User | null>;

  constructor(private http: HttpClient) {}

  login({email, password}: {email: string, password: string}): Observable<any> {
    return this.http.post<IloginResponse>(`${API_USERS_URL}/login`, {
      email,
      password,
    });
  }

  verifyEmail(payload: IemailVerificationRequest){
    return this.http.post<IemailVerificationResponse>(`${API_USERS_URL}/verifyEmail`,payload)
  }

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

  loginByToken(token: string): Observable<{user: User}> {
    // const httpHeaders = new HttpHeaders({
    //   Authorization: `Bearer ${token}`,
    // });
    return this.http.get<{user: User}>(`${API_USERS_URL}/loginUsingToken`);
  }
}
