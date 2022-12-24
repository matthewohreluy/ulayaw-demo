import { createReducer, on } from '@ngrx/store';
import { RegisterStateInterface } from '../../../interfaces/auth.interface';
import { registerAction, registerSuccessAction, registerFailAction, registerReset } from './register.action';
const initialState: RegisterStateInterface = {
  isSubmitting: false,
  validationErrors: null,
  isCreatedSuccessfully: null
}

export const registerReducer = createReducer(
  initialState,
  on(registerAction, (state): RegisterStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null,
    isCreatedSuccessfully: null
    })
  ),
  on(registerSuccessAction, (state, action): RegisterStateInterface=>({
    ...state,
    isSubmitting: false,
    validationErrors: null,
    isCreatedSuccessfully: true,
  })),
  on(registerFailAction, (state, action): RegisterStateInterface=>({
    ...state,
    isSubmitting: false,
    validationErrors: action.payload,
    isCreatedSuccessfully: false
  })),
  on(registerReset, (): RegisterStateInterface =>({
    ...initialState
  }))
)
