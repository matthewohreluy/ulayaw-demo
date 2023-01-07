import { LoginStateInterface } from '../../../interfaces/auth.interface';
import { AppStateInterface } from '../../../../../shared/store/app-state.interface';
import { createSelector } from '@ngrx/store';


export const authFeatureSelector =
(state: AppStateInterface): LoginStateInterface => state.login;

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: LoginStateInterface)=>authState.isSubmitting)

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: LoginStateInterface)=>authState.validationErrors)

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: LoginStateInterface)=>authState.isLoggedIn)

export const userSelector = createSelector(
  authFeatureSelector,
  (authState: LoginStateInterface)=>authState.user)

export const authTokenSelector = createSelector(
  authFeatureSelector,
  (authState: LoginStateInterface)=>authState.authToken)


export const hasLoadedSelector = createSelector(
  authFeatureSelector,
  (authState: LoginStateInterface)=>authState.hasLoaded)
