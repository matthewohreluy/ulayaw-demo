export interface IRegisterRequest{
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  contact: string;
  role: string;
}

export interface User{
  _id: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  status: 'New' | 'Verified';
  contact: string;
  feedback:{
    rating: number;
    description: string;
    isAnonymous: boolean;
  };
  role: 'Admin' | 'Staff' | 'Guest';
  code: string;
  dateCreated: Date;
  dateUpdated: Date;
}
