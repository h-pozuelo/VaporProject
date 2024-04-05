import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../../core/services/biblioteca.service';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [],
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.css'
})
export class BibliotecaComponent implements OnInit {

  constructor(
    private bibliotecaService: BibliotecaService,
    private authService: AuthenticationService
  ) { }

  //suscribir  authservice para obtener el id del usuario
  //llamar al servicio de biblioteca para obtener la biblioteca del usuario
  //guardar la biblioteca en una variable (id)  despues pasamos el id al getBiblioteca


  ngOnInit(): void {
    this.authService.authChanged.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.authService.getUserEmail();
      }
    });
  }


  getBiblioteca(id: string) {
    this.bibliotecaService.getBiblioteca(id)
      .subscribe((data) => {
        console.log(data);
      });
  }






}
