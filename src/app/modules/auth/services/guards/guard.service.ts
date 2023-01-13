import { hasLoadedSelector } from './../../components/login/store/login.selector';
import { Observable, filter } from 'rxjs';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/store/app-state.interface';

@Injectable({
  providedIn: 'root'
})
export class GuardService{

  constructor(private store: Store<AppStateInterface>){}

  userHasLoaded(): Observable<boolean>{
    return this.store.pipe(
      select(hasLoadedSelector),
      filter(data=> data===true),
      )
   }
}
