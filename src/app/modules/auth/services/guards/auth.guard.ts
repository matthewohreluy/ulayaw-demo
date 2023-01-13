import { ReturnGuardType } from './../../../../shared/interface/guards/guard-return.type';
import { GuardService } from './guard.service';
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
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/store/app-state.interface';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private store: Store<AppStateInterface>, private router: Router,private guardService: GuardService) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): ReturnGuardType{
    return this.checkIfAuthenticated();
  }

  canActivateChild(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): ReturnGuardType{
    return this.checkIfAuthenticated();
   }

   canLoad(_route: Route, _segments: UrlSegment[]): ReturnGuardType{
    return this.checkIfAuthenticated();
   }


   private checkIfAuthenticated(): ReturnGuardType{
    return this.guardService.userHasLoaded().pipe(
      switchMap(()=>{return this.store.pipe(select(isLoggedInSelector))}),
      take(1),
      map(data=>{
        if(data === true){
          return true
        }
        return this.router.createUrlTree(['/auth/login'])
      })
    );
   }

}
