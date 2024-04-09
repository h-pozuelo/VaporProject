import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { UserForAuthenticationDto } from '../../interfaces/user-for-registration-dto';
import { AuthResponseDto } from '../../interfaces/user-for-registration-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MensajeErrorComponent } from '../../core/components/mensaje-error/mensaje-error.component';
import { EMPTY, catchError, take } from 'rxjs';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MensajeErrorComponent,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private returnUrl: string = '';
  public hide: boolean = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  errorMessage: string = '';
  // showError: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit = () => {
    if (this.loginForm.valid) {
      this.loginUser(this.loginForm.value);
    }
  };

  validateControl = (controlName: string) => {
    return (
      this.loginForm.get(controlName)?.invalid &&
      this.loginForm.get(controlName)?.touched
    );
  };

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName)?.hasError(errorName);
  };

  loginUser = (loginFormValue: any) => {
    // this.showError = false;
    this.errorMessage = '';

    const login = { ...loginFormValue };

    const userForAuth: UserForAuthenticationDto = {
      email: login.email,
      password: login.password,
    };
    this.authService
      .loginUser(userForAuth)
      .pipe(
        take(1),
        catchError((error: string) => {
          this.errorMessage = error;
          return EMPTY;
        })
      )
      .subscribe({
        next: (res: AuthResponseDto) => {
          this.localStorageService.clearCarrito();

          console.log('Successful authentication');
          localStorage.setItem('token', res.token);

          this.authService.sendAuthStateChangeNotification(
            res.isAuthSuccessful
          );

          this.router.navigate([this.returnUrl]);
        },
        // error: (err: HttpErrorResponse) => {
        //   this.errorMessage = err.message;
        //   // this.showError = true;
        // },
      });
  };

  onReset() {
    this.loginForm.reset();
    this.errorMessage = '';
    this.hide = true;
  }
}
