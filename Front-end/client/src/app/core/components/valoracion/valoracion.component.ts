import { Component, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RatingModule } from 'ngx-bootstrap/rating';

@Component({
  selector: 'app-valoracion',
  standalone: true,
  imports: [RatingModule, FormsModule, MatIconModule],
  templateUrl: './valoracion.component.html',
  styleUrl: './valoracion.component.css',
})
export class ValoracionComponent {
  @Input() public valoracion!: number;
  @Input() public isReadonly: boolean = true;

  public valoracionUpdated = output<number>();

  updateValoracion() {
    this.valoracionUpdated.emit(this.valoracion);
  }
}
