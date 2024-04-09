import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JuegoTransaccion } from '../../interfaces/juego-transaccion';

const URL: string = 'https://localhost:7280';

@Injectable({
  providedIn: 'root',
})
export class JuegosTransaccionesService {
  constructor(private http: HttpClient) {}

  getJuegosTransaccion(idTransaccion: number): Observable<JuegoTransaccion[]> {
    return this.http.get<JuegoTransaccion[]>(
      `${URL}/api/JuegosTransacciones/idTransaccion`,
      {
        params: new HttpParams().set('idTransaccion', idTransaccion),
      }
    );
  }

  createJuegoTransaccion(
    juegoTransaccion: JuegoTransaccion
  ): Observable<JuegoTransaccion> {
    return this.http.post<JuegoTransaccion>(
      `${URL}/api/JuegosTransacciones/`,
      juegoTransaccion
    );
  }
}
