import { Component, OnInit } from '@angular/core';
import { IJuegoResults } from '../../interfaces/juego';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { TablaJuegosComponent } from '../../core/components/tabla-juegos/tabla-juegos.component';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [TablaJuegosComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent implements OnInit {
  public juegoResults: IJuegoResults = {};

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.localStorageService
      .getCarrito()
      .forEach((juego) => (this.juegoResults[juego.appid] = juego));
  }
}
