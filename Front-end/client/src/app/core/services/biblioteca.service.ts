import { HttpClient } from '@angular/common/http';
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



}
