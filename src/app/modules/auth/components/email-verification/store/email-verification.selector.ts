import { createSelector } from '@ngrx/store';
import { EmailVerificationInterface } from './../../../interfaces/auth.interface';
import { AppStateInterface } from 'src/app/shared/store/app-state.interface';



export const emailVerificationSelector =
(state: AppStateInterface): EmailVerificationInterface => state.emailVerification;

export const isSubmittingSelector = createSelector(
  emailVerificationSelector,
  (authState: EmailVerificationInterface)=>authState.isSubmitting);

export const validationErrorsSelector = createSelector(
  emailVerificationSelector,
  (authState: EmailVerificationInterface)=>authState.validationErrors)

export const isVerifiedSelector = createSelector(
  emailVerificationSelector,
  (authState: EmailVerificationInterface)=>authState.isVerified)
