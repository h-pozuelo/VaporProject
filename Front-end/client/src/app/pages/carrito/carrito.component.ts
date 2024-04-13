import { Component, OnInit } from '@angular/core';
import { IJuegoResults } from '../../interfaces/juego';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { TablaJuegosComponent } from '../../core/components/tabla-juegos/tabla-juegos.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MensajeErrorComponent } from '../../core/components/mensaje-error/mensaje-error.component';
import { AuthenticationService } from '../../core/services/authentication.service';
import { TransaccionesService } from '../../core/services/transacciones.service';
import { JuegosTransaccionesService } from '../../core/services/juegos-transacciones.service';
import { BibliotecaService } from '../../core/services/biblioteca.service';
import { Router } from '@angular/router';
import { UserDetailsDto } from '../../interfaces/user-details-dto';
import { Transaccion } from '../../interfaces/Transaccion';
import { EMPTY, catchError, take } from 'rxjs';
import { JuegoTransaccion } from '../../interfaces/juego-transaccion';
import { IBiblioteca } from '../../interfaces/Biblioteca';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UsuariosService } from '../../core/services/usuarios.service';
import { AlertaConfirmacionComponent } from '../../core/components/alerta-confirmacion/alerta-confirmacion.component';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    TablaJuegosComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MensajeErrorComponent,
    MatDialogModule,
  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent implements OnInit {
  public juegoResults!: IJuegoResults;
  public errorMessage!: string;
  public saldo!: number;

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthenticationService,
    private transaccionesService: TransaccionesService,
    private juegosTransaccionesService: JuegosTransaccionesService,
    private bibliotecaService: BibliotecaService,
    private router: Router,
    private usuariosService: UsuariosService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCarrito();

    let idUsuario: string = this.authService.getUserDetails().id;

    this.usuariosService
      .getUsuario(idUsuario)
      .pipe(
        take(1),
        catchError((error: string) => {
          this.errorMessage = error;
          return EMPTY;
        })
      )
      .subscribe({
        next: (data) => {
          this.saldo = data.saldo;
        },
      });
  }

  getCarrito() {
    this.juegoResults = Object.create({});

    this.localStorageService
      .getCarrito()
      .forEach((juego) => (this.juegoResults[juego.appid] = juego));
  }

  comprar() {
    this.errorMessage = '';

    // Obtenemos los detalles del usuario que actualmente se encuentra autenticado
    let userDetails: UserDetailsDto = Object.assign(
      {},
      this.authService.getUserDetails()
    );

    // Calculamos el importe total de todos aquellos productos agregados al carrito
    let importe: number = this.localStorageService.getImporte();

    if (this.saldo < importe) {
      const dialogRef = this.dialog.open(AlertaConfirmacionComponent);

      let instance = dialogRef.componentInstance;
      instance.config = {
        titulo: 'Saldo Insuficiente',
        descripcion:
          'Tu saldo es insuficiente para poder llevar a cabo la compra.',
        pregunta: '¿Deseas añadir fondos a tu cuenta?',
      };

      dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            if (data == true) {
              this.router.navigate(['/perfil']);
            } else {
              this.errorMessage =
                'Tu saldo es insuficiente para poder llevar a cabo la compra.';
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
      return;
    }

    // Creamos una transacción
    let transaccion: Transaccion = {
      id: 0,
      fechaCompra: new Date(),
      importe: importe,
      idUsuario: userDetails.id,
    };

    // Construimos una lista de appid (idJuego)
    let appidList: number[] = this.localStorageService
      .getCarrito()
      .map((juego) => juego.appid);

    /**
     * Hacemos una llamada de tipo HTTP-POST al controlador API "Transacciones".
     *
     * La función "createTransaccion()" del servicio "transaccionesService" recibe
     * como parámetro el objeto de tipo "ITransaccion" creado anteriormente.
     *
     * Nos suscribimos al Observable. Si la operación es realizada con éxito procedemos
     * a hacer una llamada de tipo HTTP-POST al controlador API "JuegosTransacciones"
     * por cada uno de los juegos que se encuentren añadidos al carrito.
     */
    this.transaccionesService
      .createTransaccionCompleta(transaccion, appidList)
      .pipe(
        take(1),
        catchError((error: string) => {
          this.errorMessage = error;
          return EMPTY;
        })
      )
      .subscribe({
        next: (data: Transaccion) => {
          console.log('Compra realizada con éxito.');
        },
        complete: () => {
          this.localStorageService.clearCarrito();
          this.getCarrito();
          this.router.navigate(['/perfil/biblioteca']);
        },
      });
  }

  carritoVacio(): boolean {
    return !(Object.keys(this.juegoResults).length > 0);
  }
}
