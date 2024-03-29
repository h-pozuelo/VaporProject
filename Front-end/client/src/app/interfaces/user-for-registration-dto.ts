export interface UserForRegistrationDto {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationResponse {
  isSuccessfulRegistration: boolean;
  errors: string[];
}
