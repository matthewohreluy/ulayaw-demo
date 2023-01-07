import { Router } from '@angular/router';
import { userSelector } from './../components/login/store/login.selector';
import { select, Store } from '@ngrx/store';
import { IemailVerificationRequest } from './../components/email-verification/email-verification.model';
import { AuthHTTPService } from './auth-http/auth-http.service';
import { User, IRegisterRequest } from './../components/registration/register.model';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription, take, lastValueFrom  } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../../../shared/models/user.model';
import { AppStateInterface } from 'src/app/shared/store/app-state.interface';


export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/




  constructor(
    private authHttpService: AuthHTTPService,
    private store: Store<AppStateInterface>,
    private router: Router
  ) {

  }

  // public methods
  login(credentials: {email: string, password: string}){
    return this.authHttpService.login(credentials)
  }



  loginByToken(token: string) {
    return this.authHttpService.loginByToken(token)
  }

  // need create new user then login
  registration(user: IRegisterRequest): Observable<User> {
    return this.authHttpService.createUser(user)
  }

  forgotPassword(email: string) {

  }

  verifyEmail(payload: IemailVerificationRequest){
    return this.authHttpService.verifyEmail(payload)
  }



  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  async navigateUserUrl(){
    let user: User | null = await lastValueFrom(this.store.pipe(select(userSelector),take(1)));
    let url: string = '';
    if(user){
      if(user.status === 'New'){
        url = '/auth/verification';
      }else{
        if(user.role === 'Admin'){
          url = 'admin'
        }else
        if(user.role === 'Staff'){
          url = 'staff'
        }else
        if(user.role === 'Guest'){
          url = 'guest'
        }
      }
      this.router.navigateByUrl(url);
    }

  }
}
