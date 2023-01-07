import { verifyEmailSuccessAction } from './../../email-verification/store/email-verification.action';
import { LoginStateInterface } from './../../../interfaces/auth.interface';
import { loginFailAction, loginSuccessAction, loginReset, loginAction, loginByTokenAction, loginByTokenSuccessAction, loginByTokenFailAction, loginSuccessLoadedAction, loginFailLoadedAction } from './login.action';
import { createReducer, on } from '@ngrx/store';

const initialState: LoginStateInterface = {
  isSubmitting: false,
  user: null,
  isLoggedIn: false,
  validationErrors: null,
  authToken: null,
  hasLoaded: false
}

export const loginReducer = createReducer(
  initialState,
  on(loginAction, (state): LoginStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null,
    authToken: null
    })
  ),
  on(loginSuccessAction, (state, action): LoginStateInterface=>({
    ...state,
    isSubmitting: false,
    validationErrors: null,
    user: action.user,
    isLoggedIn: true,
    authToken: action.token
  })),
  on(loginFailAction, (state, action): LoginStateInterface=>({
    ...state,
    isSubmitting: false,
    validationErrors: action.payload,
    user: null,
    isLoggedIn: false,
    authToken: null
  })),
  on(loginByTokenAction, (state, action): LoginStateInterface =>({
    ...state,
    validationErrors: null,
    isLoggedIn: false,
    authToken: action.token
  })),
  on(loginByTokenSuccessAction, (state, action): LoginStateInterface =>({
    ...state,
    validationErrors: null,
    user: action.user,
    isLoggedIn: true,
    authToken: action.token
  })),
  on(loginByTokenFailAction, (state, action): LoginStateInterface =>({
    ...state,
    validationErrors: action.payload,
    user: null,
    authToken: null,
    isLoggedIn: false
  })),
  on(loginSuccessLoadedAction, (state): LoginStateInterface =>({
    ...state,
    hasLoaded: true
  })),
  on(loginFailLoadedAction, (state): LoginStateInterface =>({
    ...state,
    hasLoaded: true
  })),
  on(loginReset, (): LoginStateInterface =>({
    ...initialState
  })),

  on(verifyEmailSuccessAction, (state): LoginStateInterface =>({
    ...state,
    user: {
      ...state.user!,
      status: 'Verified'
    },
  })),
)
