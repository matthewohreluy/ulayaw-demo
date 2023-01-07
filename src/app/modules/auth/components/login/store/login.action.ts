import { User } from './../../registration/register.model';
import { IloginResponse } from './../login.model';
import { BackendErrorInterface } from './../../../../../shared/interface/backend-errors.interface';

import { createAction, props } from "@ngrx/store";
import { IloginRequest } from '../login.model';

export enum ActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAIL = '[Auth] Login Fail',

 LOGIN_BY_TOKEN = '[Auth] Login by Token',
 LOGIN_BY_TOKEN_SUCCESS = '[Auth] Login By Token Success',
 LOGIN_BY_TOKEN_FAIL = '[Auth] Login By Token Fail',

 LOGIN_SUCCESS_LOADED = '[Auth] Login Success Loaded',
 LOGIN_FAIL_LOADED = '[Auth] Login Fail Loaded',

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
  props<{payload: string}>()
)

export const loginByTokenAction = createAction(
  ActionTypes.LOGIN_BY_TOKEN,
  props<{token: string}>()
)

export const loginByTokenSuccessAction = createAction(
  ActionTypes.LOGIN_BY_TOKEN_SUCCESS,
  props<{user: User, token: string}>())


export const loginByTokenFailAction = createAction(
  ActionTypes.LOGIN_BY_TOKEN_FAIL,
  props<{payload: BackendErrorInterface}>()
)

export const loginSuccessLoadedAction = createAction(
  ActionTypes.LOGIN_SUCCESS_LOADED
)

export const loginFailLoadedAction = createAction(
  ActionTypes.LOGIN_FAIL_LOADED
)

export const loginReset = createAction(
  ActionTypes.LOGIN_RESET
)

