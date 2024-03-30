import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { UserForRegistrationDto } from '../../interfaces/user-for-registration-dto';
import { EMPTY, catchError, take } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MensajeErrorComponent } from '../../core/components/mensaje-error/mensaje-error.component';
import { PasswordConfirmationValidatorService } from '../../core/services/password-confirmation-validator.service';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MensajeErrorComponent,
  ],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css',
})
export class RegistrarUsuarioComponent implements OnInit {
  public formulario!: FormGroup;
  public errorMessage!: string;
  public hide: boolean = true;
  public hideConfirm: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private passConfValidator: PasswordConfirmationValidatorService
  ) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      fullName: new FormControl('', { validators: Validators.required }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: Validators.required }),
      confirmPassword: new FormControl(''),
    });

    this.formulario.controls['confirmPassword'].setValidators([
      Validators.required,
      this.passConfValidator.validateConfirmPassword(
        this.formulario.controls['password']
      ),
    ]);
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
    const usuario: UserForRegistrationDto = {
      fullName: formValues.fullName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
    };

    this.errorMessage = '';

    this.authenticationService
      .registerUser(usuario)
      .pipe(
        take(1),
        catchError((error: string) => {
          this.errorMessage = error;
          return EMPTY;
        })
      )
      .subscribe({
        next: (_) => {
          console.log('Successful registration');
        },
      });
  }

  onReset() {
    this.formulario.reset();
    this.errorMessage = '';
    this.hide = true;
    this.hideConfirm = true;
  }
}
