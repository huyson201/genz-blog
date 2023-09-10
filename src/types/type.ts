export enum Role {
  Admin = 0,
  User = 1,
}
export interface BackendToken {
  access_token: string;
  refresh_token: string;
  expiresIn: number;
}

export interface ResponseError {
  error: string;
  message: string;
  statusCode: number;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface Auth {
  name: string;
  email: string;
  _id: string;
  avatar_url: string;
  verified: boolean;
  role: Role;
  viewHistory: [];
  createdAt: string;
  updatedAt: string;
}
