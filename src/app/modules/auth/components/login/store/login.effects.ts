import { User } from './../../registration/register.model';
import { Router } from '@angular/router';
import { IloginRequest, IloginResponse } from './../login.model';
import { loginAction, loginSuccessAction, loginFailAction, loginByTokenAction, loginByTokenSuccessAction, loginByTokenFailAction } from './login.action';
import { LocalStorageService } from './../../../../../shared/services/local-storage.service';
import { AuthService } from './../../../services/auth.service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class LoginEffect{
  login$ = createEffect(()=>
  this.actions$.pipe(
    ofType(loginAction),
    switchMap((credentials: IloginRequest)=>{
      return this.authService.login(credentials).pipe(
        map((data: any)=>{
          const response: IloginResponse = {user: data.user, token: data.token};
          // store data to token;
          return loginSuccessAction(response)
        }),
        catchError((errorResponse: HttpErrorResponse)=>{
          return of(loginFailAction({payload: errorResponse.error.payload}))
          })
        )
      })
    )
  );

  redirectAfterLoginSuccess$ = createEffect(
    ()=>
    this.actions$.pipe(
      ofType(loginSuccessAction),
      tap((data)=>{
        this.localStorageService.set('accessToken',data.token);
        // check if validated, if validated => dashboard, if not => 6 digit verification
        const url = data.user.status === 'New' ? '/auth/verification' : '/dashboard'
        this.router.navigateByUrl(url);
      })
    ),
    {dispatch: false}
  );

  loginByToken$ = createEffect(()=>
  this.actions$.pipe(
    ofType(loginByTokenAction),
    switchMap(({token}: {token: string})=>{
      return this.authService.loginByToken(token).pipe(
        map((data: {user: User})=>{
          const response: {user: User} = {user: data.user};
          // store data to token;
          console.log(response);
          return loginByTokenSuccessAction(response)
        }),
        catchError((errorResponse: HttpErrorResponse)=>{
          return of(loginByTokenFailAction({payload: errorResponse.error.payload}))
          })
        )
      })
    )
  );


  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalStorageService){}
}
