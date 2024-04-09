import { Injectable } from '@angular/core';
import { IJuego } from '../../interfaces/juego';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public carrito!: IJuego[];

  constructor() {
    this.getCarrito();
  }

  addJuego(juego: IJuego): void {
    if (this.indexOfJuego(juego.appid) == -1) {
      this.carrito.push(juego);
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
  }

  getCarrito(): IJuego[] {
    this.carrito = JSON.parse(localStorage.getItem('carrito') ?? '[]');
    if (!this.carrito || !(this.carrito.length > 0)) {
      this.carrito = [];
    }
    return this.carrito;
  }

  indexOfJuego(appid: number): number {
    return this.carrito.findIndex((juego) => juego.appid == appid);
  }

  removeJuego(appid: number): void {
    if (this.indexOfJuego(appid) != -1) {
      this.carrito.splice(this.indexOfJuego(appid), 1);
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
  }

  clearCarrito(): void {
    localStorage.setItem('carrito', '[]');
  }

  getImporte(): number {
    let precios: number[] = this.carrito.map((juego) => Number(juego.price));
    let importe = precios.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return importe;
  }
}
