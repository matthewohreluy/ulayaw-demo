import { ModalComponent } from './../../../../_metronic/partials/layout/modals/modal/modal.component';
import { ModalConfig } from './../../../../_metronic/partials/layout/modals/modal.config';
import { BackendErrorInterface } from './../../../../shared/interface/backend-errors.interface';
import { isSubmittingSelector, validationErrorsSelector, isCreatedSuccessfullySelector } from './store/register.selector';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { UserModel } from '../../../../shared/models/user.model';
import { select, Store } from '@ngrx/store';
import { registerAction, registerReset } from './store/register.action';
import { AppStateInterface } from 'src/app/shared/store/app-state.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  hasError: boolean;

  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorInterface | null>;
  isCreatedSuccessfully$: Observable<boolean | null>;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  modalConfig: ModalConfig = {
    modalTitle: 'Account Creation',
    dismissButtonLabel: 'Ok',
    hideCloseButton: () => true
  };
  @ViewChild('modal') private modalComponent: ModalComponent;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppStateInterface>
  ) {

    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  ngOnInit(): void {
    this.resetState();
    this.initForm();
    this.initValues();
  }

  resetState(){
    this.store.dispatch(registerReset())
  }

  initValues(){
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
    this.isCreatedSuccessfully$ = this.store.pipe(select(isCreatedSuccessfullySelector));


    const backendSub = this.backendErrors$.pipe()
    .subscribe((value)=>{
      if(value){
        this.registrationForm.reset();
      }
    })
    this.unsubscribe.push(backendSub);

    const isCreatedSub = this.isCreatedSuccessfully$.pipe()
    .subscribe((value)=>{
      if(value){
        this.openModal();
      }
    })
    this.unsubscribe.push(isCreatedSub);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        firstName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ]),
        ],
        lastName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(5),
            Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        contact: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern("^[0-9]*$"),
            Validators.minLength(11),
            Validators.maxLength(11),
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
          ]),
        ],
        cPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
          ]),
        ],
        agree: [false, Validators.compose([Validators.required])],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  submit() {
    this.hasError = false;
    const result: {
      [key: string]: string;
    } = {
      role: 'Guest'
    };
    Object.keys(this.f).forEach((key) => {
      result[key] = this.f[key].value;
    });
    const newUser = new UserModel();
    newUser.setUser(result);
    this.store.dispatch(registerAction(newUser))
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
