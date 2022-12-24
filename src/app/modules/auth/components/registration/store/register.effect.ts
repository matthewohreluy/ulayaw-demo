import { LocalStorageService } from './../../../../../shared/services/local-storage.service';
import { User, IRegisterRequest } from './../register.model';
import { AuthService } from './../../../services/auth.service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { registerAction, registerSuccessAction, registerFailAction } from './register.action';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RegisterEffect{
  register$ = createEffect(()=>
  this.actions$.pipe(
    ofType(registerAction),
    switchMap((request: IRegisterRequest)=>{
      console.log(request);
      return this.authService.registration(request).pipe(
        map((_currentUser: User)=>{
          return registerSuccessAction()
        }),
        catchError((errorResponse: HttpErrorResponse)=>{
          return of(registerFailAction({payload: errorResponse.error.payload}))
          })
        )
      })
    )
  );





  constructor(private actions$: Actions, private authService: AuthService){}
}
