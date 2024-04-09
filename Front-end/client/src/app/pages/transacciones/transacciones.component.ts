import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { EMPTY, Observable, catchError, forkJoin, take } from 'rxjs';
import { Transaccion } from '../../interfaces/Transaccion';
import { TransaccionesService } from '../../core/services/transacciones.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { MensajeErrorComponent } from '../../core/components/mensaje-error/mensaje-error.component';
import { PricePipe } from '../../core/pipes/price.pipe';
import { TablaJuegosComponent } from '../../core/components/tabla-juegos/tabla-juegos.component';
import { JuegosService } from '../../core/services/juegos.service';
import { IJuego } from '../../interfaces/juego';
import { JuegosTransaccionesService } from '../../core/services/juegos-transacciones.service';
import { JuegoTransaccion } from '../../interfaces/juego-transaccion';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MensajeErrorComponent,
    DatePipe,
    PricePipe,
    CurrencyPipe,
    TablaJuegosComponent,
  ],
  templateUrl: './transacciones.component.html',
  styleUrl: './transacciones.component.css',
})
export class TransaccionesComponent implements OnInit {
  public transacciones$!: Observable<Transaccion[]>;
  public errorMessage!: string;
  public juegos$!: Observable<IJuego[]>;

  constructor(
    private transaccionesService: TransaccionesService,
    private authService: AuthenticationService,
    private juegosTransaccionesService: JuegosTransaccionesService,
    private juegosService: JuegosService
  ) {}

  ngOnInit(): void {
    let idUsuario = this.authService.getUserDetails().Id;

    this.transacciones$ = this.transaccionesService
      .getTransaccionesUsuario(idUsuario)
      .pipe(
        take(1),
        catchError((error: string) => {
          this.errorMessage = error;
          return EMPTY;
        })
      );
  }

  getJuegosTransaccion(idTransaccion: number): void {
    this.juegosTransaccionesService
      .getJuegosTransaccion(idTransaccion)
      .pipe(
        take(1),
        catchError((error: string) => {
          this.errorMessage = error;
          return EMPTY;
        })
      )
      .subscribe({
        next: (data) => {
          let appidList: number[] = data.map(
            (juegoTransaccion: JuegoTransaccion) => juegoTransaccion.idJuego
          );
          let juegos: Observable<IJuego>[] = [];

          appidList.forEach((appid) =>
            juegos.push(this.juegosService.getJuego(appid))
          );

          this.juegos$ = forkJoin(juegos);
        },
      });
  }
}
