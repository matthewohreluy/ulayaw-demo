import { IemailVerificationResponse } from './../components/email-verification/email-verification.model';
import { User } from './../components/registration/register.model';
import { BackendErrorInterface } from '../../../shared/interface/backend-errors.interface';
export interface RegisterStateInterface{
  isSubmitting: boolean;
  validationErrors: BackendErrorInterface | null;
  isCreatedSuccessfully: boolean | null;
}

export interface LoginStateInterface{
  isSubmitting: boolean;
  validationErrors: BackendErrorInterface | null | string;
  user: User | null;
  isLoggedIn: boolean | null;
  authToken: string | null;
  hasLoaded: boolean;
}

export interface EmailVerificationInterface{
  isSubmitting: boolean;
  validationErrors: string | null;
  isVerified: boolean | null;
}
