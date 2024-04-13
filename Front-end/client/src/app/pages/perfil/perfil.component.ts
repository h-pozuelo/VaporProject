import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, catchError, take } from 'rxjs';
import { UserDetailsDto } from '../../interfaces/user-details-dto';
import { UsuariosService } from '../../core/services/usuarios.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { MensajeErrorComponent } from '../../core/components/mensaje-error/mensaje-error.component';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PricePipe } from '../../core/pipes/price.pipe';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    MensajeErrorComponent,
    AsyncPipe,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    PricePipe,
    CurrencyPipe,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  public usuario$!: Observable<UserDetailsDto>;
  public errorMessage!: string;

  public formControls: IFormControls = {};
  public formulario!: FormGroup;
  public controls!: string[];

  public controlsLabels: any = {
    id: 'ID',
    fechaRegistro: 'Fecha de Registro',
    nomApels: 'Nombre Completo',
    saldo: 'Saldo (en céntimos)',
    userName: 'Nombre de Usuario',
    email: 'Email',
    phoneNumber: 'Número de Telefono',
  };

  constructor(
    private usuariosService: UsuariosService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.rellenarFormulario();
  }

  rellenarFormulario(): void {
    let idUsuario = this.authService.getUserDetails().id;

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
        next: (data: any) => {
          this.controls = Object.keys(data);

          this.controls.forEach((key) => {
            this.formControls[key] = new FormControl(data[key], {
              validators: Validators.required,
            });
          });

          this.formulario = new FormGroup(this.formControls);

          this.formulario.controls['saldo'].addValidators(Validators.min(0));

          this.formulario.controls['email'].addValidators(Validators.email);

          this.formulario.controls['phoneNumber'].removeValidators(
            Validators.required
          );
        },
      });
  }

  /**
   *
   * @param controlName Nombre asignado al control de formulario a través del atributo "formControlName"
   * @returns Valor booleano que indica si el control de formulario no es válido
   */
  validateControl(controlName: string): boolean {
    let control = this.formulario.controls[controlName];
    return control.invalid && control.touched;
  }

  /**
   *
   * @param controlName Nombre asignado al control de formulario a través del atributo "formControl"
   * @param errorName Nombre de la validación asignada al control de formulario al momento de crearlo usando la clase "FormControl"
   * @returns Valor booleano que indica si el control de formulario posee errores de validación
   */
  hasError(controlName: string, errorName: string): boolean {
    let control = this.formulario.controls[controlName];
    return control.hasError(errorName);
  }

  onSubmit() {
    const formValues = this.formulario.value;
    const userDetailsDto: UserDetailsDto = {
      id: formValues.id,
      fechaRegistro: formValues.fechaRegistro,
      nomApels: formValues.nomApels,
      saldo: formValues.saldo,
      userName: formValues.userName,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
    };

    this.errorMessage = '';

    let idUsuario = this.authService.getUserDetails().id;

    this.usuariosService
      .updateUsuario(idUsuario, userDetailsDto)
      .pipe(
        take(1),
        catchError((error: string) => {
          this.errorMessage = error;
          return EMPTY;
        })
      )
      .subscribe({
        next: (_) => {
          console.log('Usuario modificado');
          this.rellenarFormulario();
        },
      });
  }

  onReset() {
    this.rellenarFormulario();
    this.errorMessage = '';
  }
}

export interface IFormControls {
  [key: string]: FormControl;
}
