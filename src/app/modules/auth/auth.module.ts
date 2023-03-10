import { EmailVerificationEffect } from './components/email-verification/store/email-verification.effect';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { LoginEffect } from './components/login/store/login.effects';
import { ModalsModule } from './../../_metronic/partials/layout/modals/modals.module';
import { RegisterEffect } from './components/registration/store/register.effect';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthComponent } from './auth.component';
import { TranslationModule } from '../i18n/translation.module';
import { EffectsModule } from '@ngrx/effects';
import * as register from './components/registration/store/register.reducer';
import * as emailVerification from './components/email-verification/store/email-verification.reducer';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    EmailVerificationComponent,
    LogoutComponent,
    AuthComponent,
  ],
  imports: [
    ModalsModule,
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forFeature([RegisterEffect, EmailVerificationEffect]),
    StoreModule.forFeature('register',register.registerReducer),
    StoreModule.forFeature('emailVerification',emailVerification.emailVerificationReducer),
  ],
})
export class AuthModule {}
