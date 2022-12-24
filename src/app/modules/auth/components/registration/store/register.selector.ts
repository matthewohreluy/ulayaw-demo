import { RegisterStateInterface } from '../../../interfaces/auth.interface';
import { AppStateInterface } from './../../../../../shared/store/app-state.interface';
import { createSelector } from '@ngrx/store';


export const authFeatureSelector =
(state: AppStateInterface): RegisterStateInterface => state.register;

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: RegisterStateInterface)=>authState.isSubmitting)

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: RegisterStateInterface)=>authState.validationErrors)

export const isCreatedSuccessfullySelector = createSelector(
  authFeatureSelector,
  (authState: RegisterStateInterface)=>authState.isCreatedSuccessfully)
