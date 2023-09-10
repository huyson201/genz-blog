enum Role {
  Admin = 0,
  User = 1,
}

interface ResponseError {
  error: string;
  message: string;
  statusCode: number;
}

interface BackendToken {
  access_token: string;
  refresh_token: string;
  expiresIn: number;
}

interface Auth {
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

interface UserLoginResponse extends Auth {
  backendTokens: BackendToken;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}
