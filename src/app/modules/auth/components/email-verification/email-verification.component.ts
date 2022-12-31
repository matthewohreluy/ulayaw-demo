import { Observable } from 'rxjs';
import { User } from './../registration/register.model';
import { Component, OnInit } from "@angular/core";
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/store/app-state.interface';
import { userSelector } from '../login/store/login.selector';

@Component({
  selector: 'app-email-verification',
  templateUrl: 'email-verification.component.html',
  styleUrls: ['email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit{
  user$: Observable<User | null>;
  constructor(private store: Store<AppStateInterface>){}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(userSelector))
  }

}
