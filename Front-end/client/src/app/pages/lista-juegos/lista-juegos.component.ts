import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { EMPTY, Observable, catchError } from 'rxjs';
import { IJuegoResults } from '../../interfaces/juego';
import { JuegosService } from '../../core/services/juegos.service';
import { TablaJuegosComponent } from '../../core/components/tabla-juegos/tabla-juegos.component';
import { MensajeErrorComponent } from '../../core/components/mensaje-error/mensaje-error.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-lista-juegos',
  standalone: true,
  imports: [
    AsyncPipe,
    TablaJuegosComponent,
    MensajeErrorComponent,
    MatCardModule,
  ],
  templateUrl: './lista-juegos.component.html',
  styleUrl: './lista-juegos.component.css',
})
export class ListaJuegosComponent implements OnInit {
  public juegoResults$!: Observable<IJuegoResults>;
  public errorMessage!: string;

  constructor(private juegosService: JuegosService) {}

  ngOnInit(): void {
    this.juegoResults$ = this.juegosService.getAllJuegos().pipe(
      catchError((error: string) => {
        this.errorMessage = error;
        return EMPTY;
      })
    );
  }
}
