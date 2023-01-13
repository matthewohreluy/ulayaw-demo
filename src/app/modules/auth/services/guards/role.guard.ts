import { ReturnGuardType } from './../../../../shared/interface/guards/guard-return.type';
import { User } from './../../components/registration/register.model';
import { isLoggedInSelector, userSelector } from './../../components/login/store/login.selector';
import { GuardService } from './guard.service';
import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, switchMap, take } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/store/app-state.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivateChild, CanLoad {

  constructor(
    private store: Store<AppStateInterface>,
    private guardService: GuardService,
    private router: Router
    ){}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): ReturnGuardType {
    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): ReturnGuardType {
   return this.guardService.userHasLoaded().pipe(
      switchMap(()=>{return this.store.pipe(select(userSelector))}),
      take(1),
      map((user: User | null)=>{
        const role = user?.role;
        if(role === route.data!['role']){
          return true
        }else{
          let prefixUrl = role?.toLowerCase();
          return this.router.createUrlTree([prefixUrl + '/dashboard']);
        }
      })
    )
  }

}
