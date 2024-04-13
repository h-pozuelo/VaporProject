import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaccion } from '../../interfaces/Transaccion';

const URL: string = 'https://localhost:7280';

@Injectable({
  providedIn: 'root',
})
export class TransaccionesService {
  constructor(private http: HttpClient) {}

  getTransaccionesUsuario(idUsuario: string): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(`${URL}/api/Transacciones/idUsuario`, {
      params: new HttpParams().set('idUsuario', idUsuario),
    });
  }

  createTransaccion(transaccion: Transaccion): Observable<Transaccion> {
    return this.http.post<Transaccion>(
      `${URL}/api/Transacciones/`,
      transaccion
    );
  }

  createTransaccionCompleta(
    transaccion: Transaccion,
    appidList: number[]
  ): Observable<Transaccion> {
    return this.http.post<Transaccion>(
      `${URL}/api/Transacciones/appidList`,
      transaccion,
      {
        params: new HttpParams().set('appidList', appidList.join(',')),
      }
    );
  }
}
