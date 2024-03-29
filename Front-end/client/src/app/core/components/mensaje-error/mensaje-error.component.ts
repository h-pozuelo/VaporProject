import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-mensaje-error',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './mensaje-error.component.html',
  styleUrl: './mensaje-error.component.css',
})
export class MensajeErrorComponent {
  @Input() mensajeError!: string;
}
