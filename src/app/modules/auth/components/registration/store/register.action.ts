import { BackendErrorInterface } from './../../../../../shared/interface/backend-errors.interface';
import { IRegisterRequest } from '../register.model';
import { createAction, props } from "@ngrx/store";

export enum ActionTypes {
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAIL = '[Auth] Register Fail',
  REGISTER_RESET = '[Auth] Register Reset'
}

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<IRegisterRequest>()
)

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS)


export const registerFailAction = createAction(
  ActionTypes.REGISTER_FAIL,
  props<{payload: BackendErrorInterface}>()
)

export const registerReset = createAction(
  ActionTypes.REGISTER_RESET
)

