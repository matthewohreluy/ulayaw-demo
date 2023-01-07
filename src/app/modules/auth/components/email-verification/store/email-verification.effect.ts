import { HttpErrorResponse } from '@angular/common/http';
import { IemailVerificationRequest, IemailVerificationResponse } from './../email-verification.model';
import { switchMap, map, catchError, of,tap } from 'rxjs';
import { verifyEmailAction, verifyEmailSuccessAction, verifyEmailFailAction } from './email-verification.action';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';




@Injectable()

export class EmailVerificationEffect{
  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
  ){}
  emailVerification$ = createEffect(()=>
  this.actions$.pipe(
    ofType(verifyEmailAction),
    switchMap((payload: IemailVerificationRequest)=>{
      return this.authService.verifyEmail(payload).pipe(
        map((data: IemailVerificationResponse)=>{
          return verifyEmailSuccessAction(data)
        }),
        catchError((errorResponse: HttpErrorResponse)=>{
          console.log(errorResponse.error)
          return of(verifyEmailFailAction(errorResponse.error))
        })
      )
    })
  )
  )

  redirectAfterVerifySuccess$ = createEffect(()=>
  this.actions$.pipe(
    ofType(verifyEmailSuccessAction),
    map(
        (_data)=>{
          // const url = '/dashboard';
          // this.router.navigateByUrl(url);
          this.authService.navigateUserUrl();
        })
      ),
      {dispatch: false}
    )
}
