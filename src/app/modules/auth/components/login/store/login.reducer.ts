import { loginFailAction, loginSuccessAction, loginReset, loginAction } from './login.action';
import { createReducer, on } from '@ngrx/store';
import { LoginStateInterface } from '../../../interfaces/auth.interface';

const initialState: LoginStateInterface = {
  isSubmitting: false,
  user: null,
  isLoggedIn: null,
  validationErrors: null,
}

export const loginReducer = createReducer(
  initialState,
  on(loginAction, (state): LoginStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null,
    })
  ),
  on(loginSuccessAction, (state, action): LoginStateInterface=>({
    ...state,
    isSubmitting: false,
    validationErrors: null,
    user: action.user,
    isLoggedIn: true,
  })),
  on(loginFailAction, (state, action): LoginStateInterface=>({
    ...state,
    isSubmitting: false,
    validationErrors: action.payload,
    user: null,
    isLoggedIn: false,
  })),
  on(loginReset, (): LoginStateInterface =>({
    ...initialState
  }))
)
