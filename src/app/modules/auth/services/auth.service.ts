import { AuthHTTPService } from './auth-http/auth-http.service';
import { User, IRegisterRequest } from './../components/registration/register.model';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../../../shared/models/user.model';


import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/




  constructor(
    private authHttpService: AuthHTTPService
  ) {

  }

  // public methods
  login(credentials: {email: string, password: string})
   {
    return this.authHttpService.login(credentials)
  }



  getUserByToken() {

  }

  // need create new user then login
  registration(user: IRegisterRequest): Observable<User> {
    return this.authHttpService.createUser(user)
  }

  forgotPassword(email: string) {

  }

  // private methods
  // private setAuthFromLocalStorage(auth: AuthModel): boolean {
  // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
  //   if (auth && auth.authToken) {
  //     localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
  //     return true;
  //   }
  //   return false;
  // }

  // private getAuthFromLocalStorage(): AuthModel | undefined {
  //   try {
  //     const lsValue = localStorage.getItem(this.authLocalStorageToken);
  //     if (!lsValue) {
  //       return undefined;
  //     }

  //     const authData = JSON.parse(lsValue);
  //     return authData;
  //   } catch (error) {
  //     console.error(error);
  //     return undefined;
  //   }
  // }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
