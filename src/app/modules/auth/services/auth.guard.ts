import { userSelector, isLoggedInSelector } from './../components/login/store/login.selector';
import { filter, map, Observable, take, tap } from 'rxjs';
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
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppStateInterface>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree{
   return this.store.pipe(
      select(userSelector),
      take(1),
      map(user=>{
        console.log(user);
        if(!!user){
          this.router.navigateByUrl('dashboard')
          return false
        }
        return true
      })
      )
  }
}
