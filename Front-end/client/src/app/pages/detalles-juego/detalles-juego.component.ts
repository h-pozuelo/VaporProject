import { AsyncPipe, CurrencyPipe, KeyValuePipe } from '@angular/common';
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
  ],
  templateUrl: './detalles-juego.component.html',
  styleUrl: './detalles-juego.component.css',
})
export class DetallesJuegoComponent implements OnInit {
  public appid!: number;
  public juego$!: Observable<IJuego>;
  public errorMessage!: string;

  constructor(
    private juegosService: JuegosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
  }
}
