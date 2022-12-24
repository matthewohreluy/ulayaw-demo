import { IloginResponse } from './../login.model';
import { BackendErrorInterface } from './../../../../../shared/interface/backend-errors.interface';

import { createAction, props } from "@ngrx/store";
import { IloginRequest } from '../login.model';

export enum ActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAIL = '[Auth] Login Fail',
  LOGIN_RESET = '[Auth] Login Reset'
}

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<IloginRequest>()
)

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<IloginResponse>())


export const loginFailAction = createAction(
  ActionTypes.LOGIN_FAIL,
  props<{payload: BackendErrorInterface}>()
)

export const loginReset = createAction(
  ActionTypes.LOGIN_RESET
)

