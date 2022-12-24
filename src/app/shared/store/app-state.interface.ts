import { RegisterStateInterface, LoginStateInterface } from './../../modules/auth/interfaces/auth.interface';

export interface AppStateInterface{
  register: RegisterStateInterface,
  login: LoginStateInterface
}
