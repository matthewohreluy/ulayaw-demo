import { User } from './../registration/register.model';
export interface IloginRequest{
  email: string;
  password: string
}

export interface IloginResponse{
  user: User;
  token: string;
}
