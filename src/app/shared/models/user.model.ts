export class UserModel {
  _id: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  contact: string;
  feedback:{
    rating: number;
    description: string;
    isAnonymous: boolean;
  };
  role: string;
  code: string;
  dateCreated: Date;
  dateUpdated: Date;

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.firstName = user.firstName || '';
    this.password = user.password || '';
    this.lastName = user.lastName || '';
    this.email = user.email || '';
    this.contact = user.contact || '';
    this.role = user.role;
  }
}
