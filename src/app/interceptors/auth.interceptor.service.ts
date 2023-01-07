import { NoAuthRoutes } from './../shared/constants/routing/no-auth-routes';
import { environment } from './../../environments/environment';
import { authTokenSelector } from './../modules/auth/components/login/store/login.selector';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, switchMap, take, filter } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../shared/store/app-state.interface';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  noAuthRoutes: string[] = NoAuthRoutes;
  constructor(private store: Store<AppStateInterface>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(authTokenSelector).pipe(
      // filter((data: any)=> data!==null),
      take(1),
      switchMap((authToken: any)=>{
        const updatedRequest = this.addToken(request, authToken)
        console.log(updatedRequest)
        return next.handle(updatedRequest)
      })
    )
    // return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, authToken: string){
    let newHeaders: HttpHeaders = request.headers
    if (this.noAuthRoutes.indexOf(request.url) == -1) {
      newHeaders = newHeaders.append('Authorization', 'Bearer ' + authToken)
    }

    const updatedRequest = request.clone({
      url: environment.apiUrl + request.url,
      headers: newHeaders
    });
    return updatedRequest;
  }
}
