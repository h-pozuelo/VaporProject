import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../../core/services/biblioteca.service';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [],
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.css'
})
export class BibliotecaComponent implements OnInit{

constructor(private bibliotecaService:BibliotecaService) {}

//suscribir  authservice para obtener el id del usuario
//llamar al servicio de biblioteca para obtener la biblioteca del usuario
//guardar la biblioteca en una variable (id)  despues pasamos el id al getBiblioteca


}
