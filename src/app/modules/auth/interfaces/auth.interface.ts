import { User } from './../components/registration/register.model';
import { BackendErrorInterface } from '../../../shared/interface/backend-errors.interface';
export interface RegisterStateInterface{
  isSubmitting: boolean;
  validationErrors: BackendErrorInterface | null;
  isCreatedSuccessfully: boolean | null;
}

export interface LoginStateInterface{
  isSubmitting: boolean;
  validationErrors: BackendErrorInterface | null;
  user: User | null;
  isLoggedIn: boolean | null;
}

