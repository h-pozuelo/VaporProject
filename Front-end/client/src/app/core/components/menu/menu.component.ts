import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LocalStorageService } from '../../services/local-storage.service';
import { AlertaConfirmacionComponent } from '../alerta-confirmacion/alerta-confirmacion.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterModule,
    MatMenuModule,
    MatDialogModule,
  ],
})
export class MenuComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  public isUserAuthenticated!: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
  ) {
    this.authService.authChanged.subscribe((response) => {
      this.isUserAuthenticated = response;
    });
  }

  ngOnInit(): void {}

  logout() {
    const dialogRef = this.dialog.open(AlertaConfirmacionComponent);

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          if (data == true) {
            this.authService.logout();
            this.localStorageService.clearCarrito();
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
