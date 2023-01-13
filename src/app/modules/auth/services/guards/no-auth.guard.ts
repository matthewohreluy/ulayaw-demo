import { UserRoles } from './../../../../shared/constants/user/user-roles';
import { User } from './../../components/registration/register.model';
import { GuardService } from './guard.service';
import { ReturnGuardType } from './../../../../shared/interface/guards/guard-return.type';
import { hasLoadedSelector } from './../../components/login/store/login.selector';
import { userSelector, isLoggedInSelector } from '../../components/login/store/login.selector';
import { filter, map, Observable, take, tap, switchMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/store/app-state.interface';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<AppStateInterface>, private router: Router, private guardService: GuardService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ReturnGuardType{
    return this.checkIfNotAuthenticated();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkIfNotAuthenticated();
  }
  private checkIfNotAuthenticated(): ReturnGuardType{
    return this.guardService.userHasLoaded().pipe(
      switchMap(()=>{return this.store.pipe(select(isLoggedInSelector))}),
      take(1),
      switchMap((data: boolean | null,index: number)=>{
        if(data === true){
         return this.store.pipe(select(userSelector),take(1))
        }else{
          return of(false)
        }
        }),
      map((data)=>{
        // return true;
        if(data === false){
          return true
        }else{
          let user: User = data as User;
          let url: string = '';
          if(user.status === 'New'){
            url = '/auth/verification';
          }else{
            if(user.role === UserRoles.Admin){
              url = 'admin'
            }else
            if(user.role === UserRoles.Staff){
              url = 'staff'
            }else
            if(user.role === UserRoles.Guest){
              url = 'guest'
            }
          }
          return this.router.createUrlTree(['/'+url]);
        }
      })
    )
  }
}
