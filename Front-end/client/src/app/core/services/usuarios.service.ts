import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetailsDto } from '../../interfaces/user-details-dto';

const URL: string = 'https://localhost:7280';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  getUsuario(id: string): Observable<UserDetailsDto> {
    return this.http.get<UserDetailsDto>(`${URL}/api/Accounts/id`, {
      params: new HttpParams().set('id', id),
    });
  }

  updateUsuario(id: string, userDetailsDto: UserDetailsDto) {
    return this.http.put(`${URL}/api/Accounts/id`, userDetailsDto, {
      params: new HttpParams().set('id', id),
    });
  }
}
