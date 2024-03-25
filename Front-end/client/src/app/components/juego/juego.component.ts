import { Component, OnInit } from '@angular/core';
import { IJuego } from '../../interfaces/juego';
import { JuegosService } from '../../services/juegos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../modules/material/material.module';

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css',
})
export class JuegoComponent implements OnInit {
  public appid!: number;
  public juego!: IJuego;
  public desarrolladores: string[] = [];
  public editores: string[] = [];
  public idiomas: string[] = [];
  public generos: string[] = [];
  public etiquetas: string[] = [];

  constructor(
    private juegosService: JuegosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getJuego();
  }

  getJuego(): void {
    this.activatedRoute.params.subscribe({
      next: (data) => {
        this.appid = data['appid'];

        if (!isNaN(this.appid)) {
          this.juegosService.getJuego(this.appid).subscribe({
            next: (data) => {
              this.juego = data;
              this.desarrolladores = this.juego.developer.split(',');
              this.editores = this.juego.publisher.split(',');
              this.idiomas = (this.juego.languages ?? '').split(',');
              this.generos = (this.juego.genre ?? '').split(',');
              this.etiquetas = Object.keys(this.juego.tags ?? {});
            },
            error: (error) => {
              console.error(error);
              this.router.navigate(['/juegos']);
            },
          });
        }
      },
      error: (error) => {
        console.error(error);
        this.router.navigate(['/juegos']);
      },
    });
  }
}
