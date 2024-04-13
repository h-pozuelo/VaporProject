import { Component, EventEmitter, Input, OnInit, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Resenya } from '../../../interfaces/Resenya';
import { AuthenticationService } from '../../services/authentication.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ValoracionComponent } from '../valoracion/valoracion.component';

@Component({
  selector: 'app-formulario-resenya',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ValoracionComponent,
  ],
  templateUrl: './formulario-resenya.component.html',
  styleUrl: './formulario-resenya.component.css',
})
export class FormularioResenyaComponent implements OnInit {
  @Input() public idJuego!: number;
  public formulario!: FormGroup;

  public resenyaCreated = output<Resenya>(); // OutputEmitterRef<IResenya>

  public valoracion!: number;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.construirFormulario();
  }

  construirFormulario(): void {
    this.formulario = new FormGroup({
      comentario: new FormControl('', { validators: [Validators.required] }),
    });
  }

  validateControl(controlName: string): boolean {
    let control = this.formulario.controls[controlName];
    return control.invalid && control.touched;
  }

  hasError(controlName: string, errorName: string): boolean {
    let control = this.formulario.controls[controlName];
    return control.hasError(errorName);
  }

  onSubmit() {
    const formValues = this.formulario.value;
    const resenya: Resenya = {
      id: 0,
      comentario: formValues.comentario,
      fechaPublicacion: new Date(),
      valoracion: this.valoracion,
      idJuego: this.idJuego,
      idUsuario: this.authService.getUserDetails().id,
    };

    this.resenyaCreated.emit(resenya);

    this.formulario.reset();
    this.valoracion = 0;
  }

  onValoracionUpdated(eventData: number) {
    this.valoracion = eventData;
  }
}
