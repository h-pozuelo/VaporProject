import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resenya } from '../../interfaces/Resenya';

const URL: string = 'https://localhost:7280';

@Injectable({
  providedIn: 'root',
})
export class ResenyasService {
  constructor(private http: HttpClient) {}

  getResenyasJuego(idJuego: number): Observable<Resenya[]> {
    return this.http.get<Resenya[]>(`${URL}/api/Resenyas/idJuego`, {
      params: new HttpParams().set('idJuego', idJuego),
    });
  }

  createResenya(resenya: Resenya): Observable<Resenya> {
    return this.http.post<Resenya>(`${URL}/api/Resenyas`, resenya);
  }
}
