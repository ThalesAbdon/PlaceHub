export class AuthResponseDTO {
  token: string;
  expireIn: number;
}

export interface User {
  id: number;
  name: string;
}

export interface AuthUser {
  user: User;
}
