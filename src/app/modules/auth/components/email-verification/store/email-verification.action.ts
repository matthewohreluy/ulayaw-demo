import { IemailVerificationRequest, IemailVerificationResponse } from './../email-verification.model';

import { createAction, props } from "@ngrx/store";

export enum ActionTypes {
  VERIFY_EMAIL = '[Auth] Verify Email',
  VERIFY_EMAIL_SUCCESS = '[Auth] Verify Email Success',
  VERIFY_EMAIL_FAIL = '[Auth] Verify Email Fail',
  VERIFY_EMAIL_RESET = '[Auth] Verify Email Reset'
}

export const verifyEmailAction = createAction(
  ActionTypes.VERIFY_EMAIL,
  props<IemailVerificationRequest>()
)

export const verifyEmailSuccessAction = createAction(
  ActionTypes.VERIFY_EMAIL_SUCCESS,
  props<IemailVerificationResponse>()
)


export const verifyEmailFailAction = createAction(
  ActionTypes.VERIFY_EMAIL_FAIL,
  props<IemailVerificationResponse>()
)

export const verifyEmailResetAction = createAction(
  ActionTypes.VERIFY_EMAIL_RESET
)

