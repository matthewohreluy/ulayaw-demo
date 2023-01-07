import { hasLoadedSelector } from './../../components/login/store/login.selector';
import { userSelector, isLoggedInSelector } from '../../components/login/store/login.selector';
import { filter, map, Observable, take, tap, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  CanActivateChild,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/store/app-state.interface';

type returnGuardType = boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree;
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private store: Store<AppStateInterface>, private router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): returnGuardType{
    return this.checkIfAuthenticated();
  }

  canActivateChild(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): returnGuardType{
    return this.checkIfAuthenticated();
   }

   private checkIfAuthenticated(): returnGuardType{
    return this.store.pipe(
      select(hasLoadedSelector),
      filter(data=> data===true),
      switchMap(()=>{return this.store.pipe(select(isLoggedInSelector))}),
      take(1),
      map(data=>{
        if(data === true){
          return true
        }
        return this.router.createUrlTree(['/auth/login'])
      })
      )
   }


}