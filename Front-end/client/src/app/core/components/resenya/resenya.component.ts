import { Component, Input, OnInit } from '@angular/core';
import { Resenya } from '../../../interfaces/Resenya';
import { UsuariosService } from '../../services/usuarios.service';
import { EMPTY, Observable, catchError, take } from 'rxjs';
import { UserDetailsDto } from '../../../interfaces/user-details-dto';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ValoracionComponent } from '../valoracion/valoracion.component';

@Component({
  selector: 'app-resenya',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, DatePipe, ValoracionComponent],
  templateUrl: './resenya.component.html',
  styleUrl: './resenya.component.css',
})
export class ResenyaComponent implements OnInit {
  @Input() public resenya!: Resenya;
  public usuario$!: Observable<UserDetailsDto>;

  constructor(private userService: UsuariosService) {}

  ngOnInit(): void {
    this.usuario$ = this.userService.getUsuario(this.resenya.idUsuario).pipe(
      take(1),
      catchError((error: string) => {
        return EMPTY;
      })
    );
  }
}
