import {
  AsyncPipe,
  CurrencyPipe,
  KeyValuePipe,
  Location,
} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, catchError, take } from 'rxjs';
import { IJuego } from '../../interfaces/juego';
import { JuegosService } from '../../core/services/juegos.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { PricePipe } from '../../core/pipes/price.pipe';
import { MensajeErrorComponent } from '../../core/components/mensaje-error/mensaje-error.component';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { BibliotecaService } from '../../core/services/biblioteca.service';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-detalles-juego',
  standalone: true,
  imports: [
    AsyncPipe,
    KeyValuePipe,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    PricePipe,
    CurrencyPipe,
    MensajeErrorComponent,
  ],
  templateUrl: './detalles-juego.component.html',
  styleUrl: './detalles-juego.component.css',
})
export class DetallesJuegoComponent implements OnInit {
  public appid!: number;
  public juego$!: Observable<IJuego>;
  public errorMessage!: string;
  public enPropiedad$!: Observable<boolean>;

  constructor(
    private juegosService: JuegosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private location: Location,
    private bibliotecaService: BibliotecaService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe({
      next: (data) => {
        this.appid = data['id'];
      },
      error: (error) => {
        this.errorMessage = error;
        setTimeout(() => {
          this.router.navigate(['/lista-juegos']);
        }, 5000);
      },
    });

    this.juego$ = this.juegosService.getJuego(this.appid).pipe(
      catchError((error: string) => {
        this.errorMessage = error;
        return EMPTY;
      })
    );

    let idUsuario = this.authService.getUserDetails().Id;

    this.enPropiedad$ = this.bibliotecaService
      .enPropiedad(this.appid, idUsuario)
      .pipe(
        take(1),
        catchError((error: string) => {
          this.errorMessage = error;
          return EMPTY;
        })
      );
  }

  addJuego(juego: IJuego): void {
    this.localStorageService.addJuego(juego);
  }

  indexOfJuego(appid: number): number {
    return this.localStorageService.indexOfJuego(appid);
  }

  removeJuego(appid: number): void {
    this.localStorageService.removeJuego(appid);
  }

  goBack() {
    this.location.back();
  }
}
