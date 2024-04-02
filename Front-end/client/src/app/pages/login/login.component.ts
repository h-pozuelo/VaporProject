import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { UserForAuthenticationDto } from '../../interfaces/user-for-registration-dto';
import { AuthResponseDto } from '../../interfaces/user-for-registration-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MensajeErrorComponent } from '../../core/components/mensaje-error/mensaje-error.component';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MensajeErrorComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  private returnUrl: string = '';
  public hide: boolean = true;


  loginForm: FormGroup = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });
  errorMessage: string = '';
  showError: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit = () => {
    if (this.loginForm.valid) {
      this.loginUser(this.loginForm.value);
    }
  }

  
  

  validateControl = (controlName: string) => {
    return this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched;
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName)?.hasError(errorName);
  }

  loginUser = (loginFormValue: any) => {

    this.showError = false;
    const login = { ...loginFormValue };

    const userForAuth: UserForAuthenticationDto = {
      email: login.email,
      password: login.password
    }
    this.authService.loginUser(userForAuth)
      .subscribe({
        next: (res: AuthResponseDto) => {
          localStorage.setItem("token", res.token);
          this.router.navigate([this.returnUrl]);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.message;
          this.showError = true;
        }
      })
  }

}
