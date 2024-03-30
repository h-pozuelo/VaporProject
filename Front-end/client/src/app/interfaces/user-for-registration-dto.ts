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

// interfaz para el login
export interface UserForAuthenticationDto {
  email: string;
  password: string;
}

// interfaz para la respuesta del login
export interface AuthResponseDto {
  isAuthSuccessful: boolean;
  errorMessage: string;
  token: string;
}