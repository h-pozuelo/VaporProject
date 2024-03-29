import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  RegistrationResponse,
  UserForRegistrationDto,
} from '../../interfaces/user-for-registration-dto';
import { Observable } from 'rxjs';

const URL: string = 'https://localhost:7280';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  registerUser(
    usuario: UserForRegistrationDto
  ): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(
      `${URL}/api/Accounts/Registration`,
      usuario
    );
  }
}
