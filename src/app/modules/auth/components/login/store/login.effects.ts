import { IloginRequest, IloginResponse } from './../login.model';
import { loginAction, loginSuccessAction, loginFailAction } from './login.action';
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
        console.log('test');
        // check if validated, if validated => dashboard, if not => 6 digit verification
      })
    ),
    {dispatch: false}
  );

  constructor(private actions$: Actions, private authService: AuthService, private localStorageService: LocalStorageService){}
}
