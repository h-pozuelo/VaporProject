import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  RegistrationResponse,
  UserForRegistrationDto,
  UserForAuthenticationDto,
  AuthResponseDto,
} from '../../interfaces/user-for-registration-dto';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const URL: string = 'https://localhost:7280';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  registerUser(
    usuario: UserForRegistrationDto
  ): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(
      `${URL}/api/Accounts/Registration`,
      usuario
    );
  }

  // servicio para el login
  loginUser(usuario: UserForAuthenticationDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(
      `${URL}/api/Accounts/Login`,
      usuario
    );
  }

  // Método para saber si está autenticado el usuario
  sendAuthStateChangeNotification(isAuthenticated: boolean) {
    this.authChangeSub.next(isAuthenticated);
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token');
    this.sendAuthStateChangeNotification(false);
  }

  isUserAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  // Método para obtener del AuthResponseDto el email/nombre de usuario
  getUserEmail() {
    const token = localStorage.getItem('token') as string;
    const decodedToken = this.jwtHelper.decodeToken(token);
    const email =
      decodedToken[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/email'
      ];

    return email;
  }
}
