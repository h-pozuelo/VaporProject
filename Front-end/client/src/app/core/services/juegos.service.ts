import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJuego, IJuegoResults } from '../../interfaces/juego';

const URL: string = '/steamspy';

@Injectable({
  providedIn: 'root',
})
export class JuegosService {
  constructor(private http: HttpClient) {}

  getAllJuegos(): Observable<IJuegoResults> {
    return this.http.get<IJuegoResults>(URL, {
      params: new HttpParams().set('request', 'top100in2weeks'),
    });
  }

  getJuego(appid: number): Observable<IJuego> {
    return this.http.get<IJuego>(URL, {
      params: new HttpParams().set('request', 'appdetails').set('appid', appid),
    });
  }
}
