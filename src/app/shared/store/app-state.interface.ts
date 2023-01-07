import { RegisterStateInterface, LoginStateInterface, EmailVerificationInterface } from './../../modules/auth/interfaces/auth.interface';

export interface AppStateInterface{
  register: RegisterStateInterface,
  login: LoginStateInterface,
  emailVerification: EmailVerificationInterface
}
