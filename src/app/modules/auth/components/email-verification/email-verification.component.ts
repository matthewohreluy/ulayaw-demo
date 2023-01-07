import { validationErrorsSelector, isSubmittingSelector } from './store/email-verification.selector';
import { verifyEmailAction } from './store/email-verification.action';
import { IemailVerificationRequest } from './email-verification.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilitiesService } from './../../services/utilities/utilities.service';
import { Observable, Subscription, distinctUntilChanged, filter, pairwise, fromEvent } from 'rxjs';
import { User } from './../registration/register.model';
import { Component, OnInit, OnDestroy, ElementRef } from "@angular/core";
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/store/app-state.interface';
import { userSelector } from '../login/store/login.selector';

@Component({
  selector: 'app-email-verification',
  templateUrl: 'email-verification.component.html',
  styleUrls: ['email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit, OnDestroy{
  user$: Observable<User | null>;

  validationErrors$: Observable<string | null>;
  isSubmitting$: Observable<boolean>;

  codeForm: FormGroup;
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppStateInterface>,
    public utilitiesService: UtilitiesService,
    private fb: FormBuilder,
    private el: ElementRef,
    ){}

  // Lifecycle hooks
  ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  initValues(){
    this.user$ = this.store.pipe(select(userSelector));
    this.validationErrors$ = this.store.pipe(select(validationErrorsSelector))
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  initForm(){
    this.codeForm = this.fb.group({
      code1: ['', Validators.compose([Validators.required, Validators.maxLength(1), Validators.minLength(1)])],
      code2: ['', Validators.compose([Validators.required, Validators.maxLength(1), Validators.minLength(1)])],
      code3: ['', Validators.compose([Validators.required, Validators.maxLength(1), Validators.minLength(1)])],
      code4: ['', Validators.compose([Validators.required, Validators.maxLength(1), Validators.minLength(1)])],
      code5: ['', Validators.compose([Validators.required, Validators.maxLength(1), Validators.minLength(1)])],
      code6: ['', Validators.compose([Validators.required, Validators.maxLength(1), Validators.minLength(1)])],
    });

    // listen to changes
    for(let i = 1; i<=6; i++){
      this.subscription.add(
        this.codeForm.controls['code'+ i ].valueChanges
        .pipe(
          distinctUntilChanged()
        )
        .subscribe((text)=>{
          this.validateFieldAndNext(text, i)
        })
      );

      this.subscription.add(
        fromEvent(this.el.nativeElement.querySelector('[formcontrolname="code' + (i) + '"]'), 'keydown')
        .pipe(
          filter((event: any)=>event.keyCode === 8 || event.keyCode === 46)
        )
        .subscribe((event: any)=>{
          if(event.keyCode === 8 || event.keyCode === 46){
            this.moveBack(i)
          }
        })
      );
    }
  }

  moveBack(index: number){
    if(index > 1 && this.codeForm.controls['code' + index].value === ''){
      let inputFocus = this.el.nativeElement.querySelector('[formcontrolname="code' + (index - 1) + '"]');
      inputFocus.focus();
    }
  }

  onSubmit(){
    let code: string = '';
    for(let key in this.codeForm.value){
      code += this.codeForm.value[key];
    }
    const data: IemailVerificationRequest ={
      code: code
    }
    this.store.dispatch(verifyEmailAction(data));
  }


  validateFieldAndNext(text: string, index: number){
    // only numbers
    const pattern = /^[0-9]*$/;
    // invalid character, prevent input
    if (!pattern.test(text)) {
      text = text.replace(/[^0-9]/g, "");
      this.codeForm.controls['code' + index].setValue(text);
    }

    if(this.codeForm.controls['code' + index].value.length == 1)
    {
      if(index <6){
        let inputFocus = this.el.nativeElement.querySelector('[formcontrolname="code' + (index+1) + '"]');
        inputFocus.focus();
      }
    }
  }

}
