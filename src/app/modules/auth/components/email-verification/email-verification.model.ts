export interface IemailVerificationRequest{
  code: string;
}


export interface IemailVerificationResponse{
  message: string;
  key: string;
}
