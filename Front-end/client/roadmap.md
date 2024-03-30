## [25/03/2024]

`ng new client --routing --skip-git --skip-tests --style css`

`ng generate iterface interfaces/juego`

Dentro de **`./src/app/interfaces/juego.ts`**

```
export interface IEtiqueta {
  [key: string]: number;
}

export interface IJuego {
  appid: number;
  name: string;
  developer: string;
  publisher: string;
  score_rank: string;
  positive: number;
  negative: number;
  userscore: number;
  owners: string;
  average_forever: number;
  average_2weeks: number;
  median_forever: number;
  median_2weeks: number;
  price: string;
  initialprice: string;
  discount: string;
  ccu: number;
  languages?: string;
  genre?: string;
  tags?: IEtiqueta;
}

export interface IJuegoResults {
  [key: string]: IJuego;
}
```

Crear el fichero **`./src/proxy.conf.json`**

Dentro de **`./src/proxy.conf.json`**

```
{
  "/steamspy": {
    "target": "https://steamspy.com/api.php",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

Dentro de **`./angular.json`**

```
{
  ...,
  "projects": {
    "client": {
      ...,
      "architect": {
        ...,
        "serve": {
          ...,
          "options": {
            "proxyConfig": "src/proxy.conf.json"
          },
          ...
        },
        ...
      }
    }
  }
}
```

Dentro de **`./src/app/app.config.ts`**

```
...
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()],
};
```

`ng generate service core/services/juegos`

Dentro de **`./src/app/core/services/juegos.service.ts`**

```
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJuego, IJuegoResults } from '../../interfaces/juego';

const URL: string = '/steamspy';

@Injectable({
  providedIn: 'root',
})
export class JuegosService {
  constructor(private http: HttpClient) {}

  getAllJuegos(): Observable<IJuegoResults> {
    return this.http.get<IJuegoResults>(URL, {
      params: new HttpParams().set('request', 'top100in2weeks'),
    });
  }

  getJuego(appid: number): Observable<IJuego> {
    return this.http.get<IJuego>(URL, {
      params: new HttpParams().set('request', 'appdetails').set('appid', appid),
    });
  }
}
```

`ng generate component pages/lista-juegos --inline-style --inline-template`

Dentro de **`./src/app/pages/lista-juegos/lista-juegos.component.ts`**

```
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IJuegoResults } from '../../interfaces/juego';
import { JuegosService } from '../../core/services/juegos.service';
import { IJuego } from '../../interfaces/juego';

@Component({
  selector: 'app-lista-juegos',
  standalone: true,
  imports: [AsyncPipe, KeyValuePipe],
  templateUrl: './lista-juegos.component.html',
  styleUrl: './lista-juegos.component.css',
})
export class ListaJuegosComponent implements OnInit {
  public juegoResults$!: Observable<IJuegoResults>;

  constructor(private juegosService: JuegosService) {}

  ngOnInit(): void {
    this.juegoResults$ = this.juegosService.getAllJuegos();
  }
}
```

Dentro de **`./src/app/pages/lista-juegos/lista-juegos.component.html`**

```
@if (juegoResults$ | async; as resultObject) {
<p>{{ resultObject | json }}</p>
}
```

Dentro de **`./src/app/core/services/juegos.service.ts`**

```
GET(): Observable<T> {
  return (
    this.http.get<T>(URL, { params: new HttpParams() })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';

          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Error code: ${error.status}, message: ${error.message}`;
          }

          return throwError(() => errorMessage);
        })
      )
  );
}
```

Dentro de **`./src/app/pages/lista-juegos/lista-juegos.component.ts`**

```
...
import { EMPTY, Observable, catchError } from 'rxjs';
...
export class ListaJuegosComponent implements OnInit {
  ...
  public errorMessage!: string;
  ...
  ngOnInit(): void {
    this.juegoResults$ = this.juegosService.getAllJuegos().pipe(
      catchError((error: string) => {
        this.errorMessage = error;
        return EMPTY;
      })
    );
  }
}
```

Dentro de **`./src/app/pages/lista-juegos/lista-juegos.component.html`**

```
...
@if(errorMessage){
    <p>{{ errorMessage }}</p>
}
```

`ng generate interceptor core/interceptors/error-handler`

Dentro de **`./src/app/app.config.ts`**

```
...
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    ...,
    provideHttpClient(withInterceptors([errorHandlerInterceptor])),
  ],
};
```

Dentro de **`./src/app/core/interceptors/error-handler.interceptor.ts`**

```
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  // Agregando manejo de errores
  // Con el 'pipe' visualizamos lo que hay en el torrente del 'Observable' sin suscribirnos
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error code: ${error.status}, message: ${error.message}`;
      }

      return throwError(() => errorMessage);
    })
  );
};
```

`ng generate component pages/home --inline-style --inline-template`

`ng generate component pages/detalles-juego --inline-style --inline-template`

Dentro de **`./src/app/app.routes.ts`**

```
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'lista-juegos',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/lista-juegos/lista-juegos.component').then(
            (m) => m.ListaJuegosComponent
          ),
      },
      {
        path: 'detalles-juego/:id',
        loadComponent: () =>
          import('./pages/detalles-juego/detalles-juego.component').then(
            (m) => m.DetallesJuegoComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
```

`npm install bootstrap@latest --save`

`npm install jquery@latest --save`

Dentro de **`./angular.json`**

```
{
  ...,
  "projects": {
    "client": {
      ...,
      "architect": {
        "build": {
          ...,
          "options": {
            ...,
            "styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.css"
            ],
            "scripts": [
              "node_modules/jquery/dist/jquery.min.js",
              "node_modules/@popperjs/core/dist/umd/popper.min.js",
              "node_modules/bootstrap/dist/js/bootstrap.min.js"
            ]
          },
          ...
        },
        ...
      }
    }
  }
}
```

`ng add @angular/material@latest --save`

`ng generate @angular/material:navigation core/components/menu`

Dentro de **`./src/app/core/components/menu/menu.component.ts`**

```
...
import { RouterModule } from '@angular/router';

@Component({
  ...,
  imports: [
    ...,
    RouterModule,
  ],
})
...
```

Dentro de **`./src/app/core/components/menu/menu.component.ts`**

```
<mat-sidenav-container class="sidenav-container">
  <mat-sidenav
    #drawer
    class="sidenav"
    fixedInViewport
    [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
    [mode]="(isHandset$ | async) ? 'over' : 'side'"
    [opened]="(isHandset$ | async) === false"
  >
    <mat-toolbar>Menu</mat-toolbar>
    <mat-nav-list>
      <a mat-list-item routerLink="/">Home</a>
      <a mat-list-item routerLink="/lista-juegos">Lista Juegos</a>
    </mat-nav-list>
  </mat-sidenav>
  <mat-sidenav-content>
    <mat-toolbar color="primary">
      @if (isHandset$ | async) {
      <button
        type="button"
        aria-label="Toggle sidenav"
        mat-icon-button
        (click)="drawer.toggle()"
      >
        <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
      </button>
      }
      <span>client</span>
    </mat-toolbar>
    <router-outlet />
  </mat-sidenav-content>
</mat-sidenav-container>
```

Dentro de **`./src/app/app.component.ts`**

```
...
import { MenuComponent } from './core/components/menu/menu.component';

@Component({
  ...,
  imports: [RouterOutlet, MenuComponent],
  ...,
})
export class AppComponent {
  title = 'client';
}
```

Dentro de **`./src/app/app.component.html`**

```
<app-menu></app-menu>
```

## [26/03/2024]

`"'https://cdn.akamai.steamstatic.com/steam/apps/'+juego.appid+'/capsule_184x69.jpg'"`
`"'https://cdn.akamai.steamstatic.com/steam/apps/'+juego.appid+'/capsule_616x353.jpg'"`
`"'https://cdn.akamai.steamstatic.com/steam/apps/'+juego.appid+'/header_292x136.jpg'"`
`"'https://cdn.akamai.steamstatic.com/steam/apps/'+juego.appid+'/header.jpg'"`
`"'https://cdn.akamai.steamstatic.com/steam/apps/'+juego.appid+'/hero_capsule.jpg'"`

`ng generate @angular/material:table core/components/tabla-juegos`

Dentro de **`./src/app/core/components/tabla-juegos/tabla-juegos.component.ts`**

```
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { IJuego, IJuegoResults } from '../../../interfaces/juego';

@Component({
  selector: 'app-tabla-juegos',
  templateUrl: './tabla-juegos.component.html',
  styleUrl: './tabla-juegos.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class TablaJuegosComponent implements OnInit, AfterViewInit {
  public dataSource!: MatTableDataSource<IJuego>;
  public columns = [
    {
      columnDef: 'appid',
      header: '#',
      cell: (juego: IJuego) => `${juego.appid}`,
    },
    {
      columnDef: 'capsule',
      header: 'Portada',
      cell: (juego: IJuego) =>
        `https://cdn.akamai.steamstatic.com/steam/apps/${juego.appid}/capsule_184x69.jpg`,
      name: (juego: IJuego) => `${juego.name}`,
    },
    {
      columnDef: 'name',
      header: 'Juego',
      cell: (juego: IJuego) => `${juego.name}`,
    },
    {
      columnDef: 'price',
      header: 'Precio',
      cell: (juego: IJuego) => `${juego.price}`,
    },
  ];
  public displayedColumns: string[] = this.columns.map((c) => c.columnDef);

  @Input() juegos!: IJuegoResults;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(Object.values(this.juegos));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
```

Dentro de **`./src/app/core/components/tabla-juegos/tabla-juegos.component.html`**

```
<div class="mat-elevation-z8">
  <table
    mat-table
    [dataSource]="dataSource"
    class="full-width-table"
    matSort
    aria-label="Juegos"
  >
    @for (column of columns; track column) {
    <ng-container [matColumnDef]="column.columnDef">
      @if (column.columnDef != "capsule") {
      <th mat-header-cell *matHeaderCellDef mat-sort-header>
        {{ column.header }}
      </th>
      <td mat-cell *matCellDef="let row">{{ column.cell(row) }}</td>
      } @else {
      <th mat-header-cell *matHeaderCellDef>{{ column.header }}</th>
      <td mat-cell *matCellDef="let row">
        <img
          [src]="column.cell(row)"
          class="img-fluid"
          [alt]="column?.name(row)"
          style="max-width: 184px"
        />
      </td>
      }
    </ng-container>
    }

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
  </table>

  <mat-paginator
    #paginator
    [length]="dataSource.data.length"
    [pageIndex]="0"
    [pageSize]="10"
    [pageSizeOptions]="[5, 10, 20]"
    showFirstLastButtons
    aria-label="Selecciona una página"
  >
  </mat-paginator>
</div>
```

Dentro de **`./src/app/pages/lista-juegos/lista-juegos.component.ts`**

```
...
import { TablaJuegosComponent } from '../../core/components/tabla-juegos/tabla-juegos.component';

@Component({
  ...,
  imports: [AsyncPipe, TablaJuegosComponent],
  ...,
})
...
```

Dentro de **`./src/app/pages/lista-juegos/lista-juegos.component.html`**

```
@if (juegoResults$ | async; as resultObject) {
<app-tabla-juegos [juegos]="resultObject"></app-tabla-juegos>
}
...
```

Dentro de **`./src/app/core/components/tabla-juegos/tabla-juegos.component.ts`**

```
...
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  ...,
  imports: [
    ...,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class TablaJuegosComponent implements OnInit, AfterViewInit {
  ...
  constructor(private router: Router) {}
  ...
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  detallesJuego(appid: number) {
    this.router.navigate(['/lista-juegos/detalles-juego', appid]);
  }
}
```

Dentro de **`./src/app/core/components/tabla-juegos/tabla-juegos.component.html`**

```
<div class="container container-fluid py-3">
  <mat-card>
    <mat-card-content>
      <mat-form-field>
        <mat-label>Buscar</mat-label>
        <input
          matInput
          (keyup)="applyFilter($event)"
          placeholder="Ej. Counter-Strike"
          #input
        />
      </mat-form-field>

      <div class="mat-elevation-z8">
        <table
          mat-table
          [dataSource]="dataSource"
          class="full-width-table"
          matSort
          aria-label="Juegos"
        >
          ...
          <tr
            mat-row
            (click)="detallesJuego(row.appid)"
            *matRowDef="let row; columns: displayedColumns"
          ></tr>
        </table>
        ...
      </div>
    </mat-card-content>
  </mat-card>
</div>
```

Dentro de **`./src/app/pages/detalles-juego/detalles-juego.component.ts`**

```
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, catchError, take } from 'rxjs';
import { IJuego } from '../../interfaces/juego';
import { JuegosService } from '../../core/services/juegos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalles-juego',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './detalles-juego.component.html',
  styleUrl: './detalles-juego.component.css',
})
export class DetallesJuegoComponent implements OnInit {
  public appid!: number;
  public juego$!: Observable<IJuego>;
  public errorMessage!: string;

  constructor(
    private juegosService: JuegosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe({
      next: (data) => {
        this.appid = data['id'];
      },
      error: (error) => {
        console.error(error);
        this.router.navigate(['/lista-juegos']);
      },
    });

    this.juego$ = this.juegosService.getJuego(this.appid).pipe(
      catchError((error: string) => {
        this.errorMessage = error;
        return EMPTY;
      })
    );
  }
}
```

Dentro de **`./src/app/pages/detalles-juego/detalles-juego.component.html`**

```
@if (juego$ | async; as resultObject) {
<p>{{ resultObject | json }}</p>
} @if(errorMessage){
<p>{{ errorMessage }}</p>
}
```

Dentro de **`./src/app/pages/detalles-juego/detalles-juego.component.ts`**

```
import { AsyncPipe, KeyValuePipe } from '@angular/common';
...
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  ...,
  imports: [
    ...,
    KeyValuePipe,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
  ],
  ...,
})
...
```

Dentro de **`./src/app/pages/detalles-juego/detalles-juego.component.html`**

```
@if (juego$ | async; as resultObject) {
<div class="container container-fluid py-3">
  <a mat-fab color="primary" routerLink="/lista-juegos" class="mb-3">
    <mat-icon>arrow_back</mat-icon>
  </a>

  <mat-card>
    <img
      mat-card-image
      [src]="
        'https://cdn.akamai.steamstatic.com/steam/apps/' +
        resultObject.appid +
        '/header.jpg'
      "
      [alt]="resultObject.name"
    />

    <mat-card-content>
      <mat-list>
        <mat-list-item>
          <span matListItemTitle>#</span>
          <span matListItemLine>{{ resultObject.appid }}</span>
        </mat-list-item>

        <mat-divider></mat-divider>

        <mat-list-item>
          <span matListItemTitle>Juego</span>
          <span matListItemLine>{{ resultObject.name }}</span>
        </mat-list-item>

        <mat-divider></mat-divider>

        <mat-list-item>
          <span matListItemTitle>Desarrollador</span>
          <span matListItemLine>{{ resultObject.developer }}</span>
        </mat-list-item>

        <mat-divider></mat-divider>

        <mat-list-item>
          <span matListItemTitle>Editor</span>
          <span matListItemLine>{{ resultObject.publisher }}</span>
        </mat-list-item>

        <mat-divider></mat-divider>

        <mat-list-item>
          <span matListItemTitle>Precio</span>
          <span matListItemLine>{{ resultObject.price }}</span>
        </mat-list-item>

        <mat-divider></mat-divider>

        <mat-list-item>
          <span matListItemTitle>Idiomas</span>
          <span matListItemLine>{{ resultObject.languages }}</span>
        </mat-list-item>

        <mat-divider></mat-divider>

        <mat-list-item>
          <span matListItemTitle>Género</span>
          <span matListItemLine>{{ resultObject.genre }}</span>
        </mat-list-item>

        <mat-divider></mat-divider>

        <mat-list-item>
          <span matListItemTitle>Etiquetas</span>
          <span matListItemLine>
            @for (etiqueta of resultObject.tags | keyvalue; track etiqueta.key)
            { {{ etiqueta.key }}@if(!$last) {,} }
          </span>
        </mat-list-item>
      </mat-list>
    </mat-card-content>
  </mat-card>
</div>
}
...
```

`ng generate pipe core/pipes/price`

Dentro de **`./src/app/core/pipes/price.pipe.ts`**

```
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
  pure: false,
})
export class PricePipe implements PipeTransform {
  transform(price: string): number {
    return Number(price) / 100;
  }
}
```

## [28/03/2024]

`ng generate interface interfaces/user-for-registration-dto`

Dentro de **`./src/app/interfaces/user-for-registration-dto.ts`**

```
export interface UserForRegistrationDto {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationResponse {
  isSuccessfulRegistration: boolean;
  errors: string[];
}
```

`ng generate service core/services/authentication`

Dentro de **`./src/app/core/services/juegos.service.ts`**

```
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  RegistrationResponse,
  UserForRegistrationDto,
} from '../../interfaces/user-for-registration-dto';
import { Observable } from 'rxjs';

const URL: string = 'https://localhost:7280';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  registerUser(
    usuario: UserForRegistrationDto
  ): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(
      `${URL}/api/Accounts/Registration`,
      usuario
    );
  }
}
```

`ng generate component pages/registrar-usuario`

Dentro de **`./src/app/app.routes.ts`**

```
...
export const routes: Routes = [
  ...,
  {
    path: 'registrar-usuario',
    loadComponent: () =>
      import('./pages/registrar-usuario/registrar-usuario.component').then(
        (m) => m.RegistrarUsuarioComponent
      ),
  },
  ...,
];
```

Dentro de **`./src/app/pages/registrar-usuario/registrar-usuario.component.ts`**

```
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

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      fullName: new FormControl('', { validators: Validators.required }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: Validators.required }),
      confirmPassword: new FormControl(''),
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
```

Dentro de **`./src/app/pages/registrar-usuario/registrar-usuario.component.html`**

```
<div class="container container-fluid py-3">
  @if (errorMessage) {
  <div class="mb-3">
    <app-mensaje-error [mensajeError]="errorMessage"></app-mensaje-error>
  </div>
  }

  <form
    [formGroup]="formulario"
    autocomplete="off"
    novalidate
    (ngSubmit)="onSubmit()"
  >
    <mat-card>
      <mat-card-header>
        <mat-card-title></mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <div class="row">
          <div class="col">
            <mat-form-field class="w-100">
              <mat-label>Nombre Completo</mat-label>
              <input matInput type="text" formControlName="fullName" />
              @if (validateControl('fullName') && hasError('fullName',
              'required')) {
              <mat-error
                >Nombre Completo es <strong>requerido</strong></mat-error
              >
              }
            </mat-form-field>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <mat-form-field class="w-100">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" />
              @if (validateControl('email') && hasError('email', 'required')) {
              <mat-error>Email es <strong>requerido</strong></mat-error>
              } @if (validateControl('email') && hasError('email', 'email')) {
              <mat-error>Email no es <strong>válido</strong></mat-error>
              }
            </mat-form-field>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <mat-form-field class="w-100">
              <mat-label>Contraseña</mat-label>
              <input
                matInput
                [type]="hide ? 'password' : 'text'"
                formControlName="password"
              />
              <button
                mat-icon-button
                matSuffix
                (click)="hide = !hide"
                [attr.aria-label]="'Ocultar contraseña'"
                [attr.aria-pressed]="hide"
              >
                <mat-icon>{{
                  hide ? "visibility_off" : "visibility"
                }}</mat-icon>
              </button>
              @if (validateControl('password') && hasError('password',
              'required')) {
              <mat-error>Contraseña es <strong>requerida</strong></mat-error>
              }
            </mat-form-field>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <mat-form-field class="w-100">
              <mat-label>Confirmar Contraseña</mat-label>
              <input
                matInput
                [type]="hideConfirm ? 'password' : 'text'"
                formControlName="confirmPassword"
              />
              <button
                mat-icon-button
                matSuffix
                (click)="hideConfirm = !hideConfirm"
                [attr.aria-label]="'Ocultar contraseña'"
                [attr.aria-pressed]="hideConfirm"
              >
                <mat-icon>{{
                  hideConfirm ? "visibility_off" : "visibility"
                }}</mat-icon>
              </button>
            </mat-form-field>
          </div>
        </div>
      </mat-card-content>

      <mat-card-actions class="px-3 pb-3" align="end">
        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="!formulario.valid"
        >
          Registrarse
        </button>
        <button
          mat-raised-button
          color="warn"
          type="button"
          (click)="onReset()"
          class="ms-2"
        >
          Limpiar
        </button>
      </mat-card-actions>
    </mat-card>
  </form>
</div>
```

Dentro de **`./src/app/core/components/menu/menu.component.ts`**

```
...
import { MatMenuModule } from '@angular/material/menu';

@Component({
  ...
  imports: [
    ...,
    MatMenuModule,
  ],
})
...
```

Dentro de **`./src/app/core/components/menu/menu.component.html`**

```
<mat-sidenav-container class="sidenav-container">
  ...
  <mat-sidenav-content>
    <mat-toolbar color="primary">
      ...
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>account_circle</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <a mat-menu-item routerLink="/registrar-usuario">
          <mat-icon>login</mat-icon>
          <span>Registrarse</span>
        </a>
      </mat-menu>
    </mat-toolbar>
    ...
  </mat-sidenav-content>
</mat-sidenav-container>
```

## [29/03/2024]

`ng generate service core/services/password-confirmation-validator`

Dentro de **`./src/app/core/services/password-confirmation-validator.service.ts`**

```
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PasswordConfirmationValidatorService {
  constructor() {}

  validateConfirmPassword(passwordControl: AbstractControl): ValidatorFn {
    return (
      confirmationControl: AbstractControl
    ): { [key: string]: boolean } | null => {
      const confirmValue = confirmationControl.value;
      const passwordValue = passwordControl.value;

      if (confirmValue !== passwordValue) {
        return { mustMatch: true };
      }

      return null;
    };
  }
}
```

Dentro de **`./src/app/pages/registrar-usuario/registrar-usuario.component.ts`**

```
...
import { PasswordConfirmationValidatorService } from '../../core/services/password-confirmation-validator.service';
...
export class RegistrarUsuarioComponent implements OnInit {
  ...
  constructor(
    private authenticationService: AuthenticationService,
    private passConfValidator: PasswordConfirmationValidatorService
  ) {}

  ngOnInit(): void {
    ...
    this.formulario.controls['confirmPassword'].setValidators([
      Validators.required,
      this.passConfValidator.validateConfirmPassword(
        this.formulario.controls['password']
      ),
    ]);
  }
  ...
}
```

Dentro de **`./src/app/pages/registrar-usuario/registrar-usuario.component.html`**

```
<div class="container container-fluid py-3">
  ...
  <form
    [formGroup]="formulario"
    autocomplete="off"
    novalidate
    (ngSubmit)="onSubmit()"
  >
    <mat-card>
      ...
      <mat-card-content>
        ...
        <div class="row">
          <div class="col">
            <mat-form-field class="w-100">
              ...
              @if (validateControl('confirmPassword') &&
              hasError('confirmPassword', 'required')) {
              <mat-error
                >Confirmar Contraseña es <strong>requerido</strong></mat-error
              >
              } @if (hasError('confirmPassword', 'mustMatch')) {
              <mat-error
                >Las contraseñas no <strong>coinciden</strong></mat-error
              >
              }
            </mat-form-field>
          </div>
        </div>
      </mat-card-content>
      ...
    </mat-card>
  </form>
</div>
```

Dentro de **`./src/app/core/interceptors/error-handler.interceptor.ts`**

```
...
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  // Agregando manejo de errores
  // Con el 'pipe' visualizamos lo que hay en el torrente del 'Observable' sin suscribirnos
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      ...
      if (error.error instanceof ErrorEvent) {
        ...
      } else {
        if (error.status === 400) {
          Object.values(error.error.errors).map((m) => {
            errorMessage += `${m}<br />`;
          });
        } else {
          errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }
      }
      ...
    })
  );
};
```

Continuar en el **`Server`**
