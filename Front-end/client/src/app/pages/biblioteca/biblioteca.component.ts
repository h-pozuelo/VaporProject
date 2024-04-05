import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../../core/services/biblioteca.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Observable, take, tap } from 'rxjs';
import { IJuegoResults } from '../../interfaces/juego';
import { JuegosService } from '../../core/services/juegos.service';
import { IBiblioteca } from '../../interfaces/Biblioteca';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [],
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.css'
})
export class BibliotecaComponent implements OnInit {
  public juegoResults$!: Observable<IJuegoResults>;

  constructor(
    private bibliotecaService: BibliotecaService,
    private authService: AuthenticationService,
    private juegosService: JuegosService
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
    
    // this.juegoResults$ = this.bibliotecaService.getBiblioteca()
    // .pipe(take(1))

  }
  
  getBiblioteca(id: string): Observable<IBiblioteca[]> {
    return this.bibliotecaService.getBiblioteca(id)
      .pipe(tap((data) => {
        console.log(data);
      }));
  }
  
  // getBiblioteca(id: string) {
  //   this.bibliotecaService.getBiblioteca(id)
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }
  





}
