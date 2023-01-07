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
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/store/app-state.interface';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
  constructor(private store: Store<AppStateInterface>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree{
   return this.store.pipe(
      select(hasLoadedSelector),
      filter(data=> data===true),
      switchMap(()=>{return this.store.pipe(select(isLoggedInSelector))}),
      take(1),
      map(data=>{
        if(data === true){
          return this.router.createUrlTree(['/dashboard'])
        }
        return true
      })
      )
  }
}
