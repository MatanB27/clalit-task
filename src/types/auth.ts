export interface User {
  username: string;
  password: string;
}

export interface AuthTokenPayload {
  sub: string;
  iat: number;
  exp: number;
}
