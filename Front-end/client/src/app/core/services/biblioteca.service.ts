import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBiblioteca } from '../../interfaces/Biblioteca';


const URL = 'https://localhost:7280/api/Bibliotecas';


@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  constructor(private http: HttpClient) { }

getBiblioteca(id:string):Observable<IBiblioteca[]>{
  return this.http.get<IBiblioteca[]>(`${URL}/GetBibliotecaByUserId`, {
    params: {
      id: id
    }
  });
}


postBiblioteca(biblioteca:IBiblioteca):Observable<IBiblioteca>{
  return this.http.post<IBiblioteca>(`${URL}`, biblioteca);
}

enPropiedad(idJuego: number, idUsuario: string): Observable<boolean> {
  return this.http.get<boolean>(`${URL}/enPropiedad`, {
    params: new HttpParams()
    .set('idJuego', idJuego)
    .set('idUsuario', idUsuario),
  });
}

}