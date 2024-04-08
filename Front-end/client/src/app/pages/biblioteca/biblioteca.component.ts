import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../../core/services/biblioteca.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Observable, take, tap } from 'rxjs';
import { IJuegoResults } from '../../interfaces/juego';
import { JuegosService } from '../../core/services/juegos.service';
import { IBiblioteca } from '../../interfaces/Biblioteca';
import { TablaJuegosComponent } from "../../core/components/tabla-juegos/tabla-juegos.component";
import { MensajeErrorComponent } from "../../core/components/mensaje-error/mensaje-error.component";

@Component({
    selector: 'app-biblioteca',
    standalone: true,
    templateUrl: './biblioteca.component.html',
    styleUrl: './biblioteca.component.css',
    imports: [TablaJuegosComponent, MensajeErrorComponent]
})
export class BibliotecaComponent implements OnInit {
  public juegoResults$!: Observable<IJuegoResults>;
  public biblioteca!: IBiblioteca[]; 
errorMessage: any;


  constructor(
    private bibliotecaService: BibliotecaService,
    private authService: AuthenticationService,
    private juegosService: JuegosService
  ) { }

  //suscribir  authservice para obtener el id del usuario
  //llamar al servicio de biblioteca para obtener la biblioteca del usuario
  //guardar la biblioteca en una variable (id)  despues pasamos el id al getBiblioteca

  
  // ngOnInit(): void {
  //   this.authService.authChanged.subscribe((isAuthenticated) => {
  //     if (isAuthenticated) {
  //       this.authService.getUserEmail();
  //     }
  //   });
    
    
  // }
  

  
  // getBiblioteca(id: string): Observable<IBiblioteca[]> {
  //   return this.bibliotecaService.getBiblioteca(id)
  //   .pipe(tap((data) => {
  //     console.log(data);
  //   }));
  // }


  // this.juegoResults$ = this.bibliotecaService.getBiblioteca()
  // .pipe(take(1))
  
  // getBiblioteca(id: string) {
  //   this.bibliotecaService.getBiblioteca(id)
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }
  
  ngOnInit(): void {
    this.authService.authChanged.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        const userId = this.authService.getUserEmail();
        this.getBiblioteca(userId).subscribe(biblioteca => {
          this.biblioteca = biblioteca;

        });
      }
    });
  }
 
  
  getBiblioteca(id: string): Observable<IBiblioteca[]> {
    return this.bibliotecaService.getBiblioteca(id)
      .pipe(tap((data) => {
        console.log(data);
      }));
  }

  

}
