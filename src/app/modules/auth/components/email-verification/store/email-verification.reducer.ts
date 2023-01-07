import { verifyEmailAction, verifyEmailSuccessAction, verifyEmailFailAction, verifyEmailResetAction } from './email-verification.action';
import { LoginStateInterface, EmailVerificationInterface } from './../../../interfaces/auth.interface';

import { createReducer, on } from '@ngrx/store';

const initialState: EmailVerificationInterface = {
  isSubmitting: false,
  isVerified: null,
  validationErrors: null,
}

export const emailVerificationReducer = createReducer(
  initialState,
  on(verifyEmailAction, (state): EmailVerificationInterface => ({
    ...state,
    isSubmitting: true
    })
  ),
  on(verifyEmailSuccessAction, (state): EmailVerificationInterface =>({
    ...state,
    isVerified: true,
    validationErrors: null,
    isSubmitting: false
  })),
  on(verifyEmailFailAction, (state,action): EmailVerificationInterface =>({
    ...state,
    isVerified: false,
    validationErrors: action.message,
    isSubmitting: false
  })),
  on(verifyEmailResetAction, (): EmailVerificationInterface =>({
    ...initialState,
  }))
)
