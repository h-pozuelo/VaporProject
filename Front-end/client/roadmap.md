## [24/03/2024]

`ng new client --routing --skip-git --skip-tests --style css`

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

`ng generate interface interfaces/juego`

Dentro de **`./src/app/interfaces/juego.ts`**

```
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
  tags?: Object;
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

`ng generate service services/juegos`

Dentro de **`./src/app/services/juegos.service.ts`**

```
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJuego } from '../interfaces/juego';

const URL: string = '/steamspy';

@Injectable({
  providedIn: 'root',
})
export class JuegosService {
  constructor(private http: HttpClient) {}

  getJuegos(): Observable<Object> {
    return this.http.get<Object>(URL, {
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

Dentro de **`./src/app/app.config.ts`**

```
...
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    ...,
    provideHttpClient(),
  ],
};
```

`ng generate component components/juegos --inline-style --inline-template`

Dentro de **`./src/app/components/juegos/juegos.component.ts`**

```
import { Component, OnInit } from '@angular/core';
import { IJuego } from '../../interfaces/juego';
import { JuegosService } from '../../services/juegos.service';

@Component({
  selector: 'app-juegos',
  standalone: true,
  imports: [],
  templateUrl: './juegos.component.html',
  styleUrl: './juegos.component.css',
})
export class JuegosComponent implements OnInit {
  public juegos: IJuego[] = [];

  constructor(private juegosService: JuegosService) {}

  ngOnInit(): void {
    this.getJuegos();
  }

  getJuegos(): void {
    this.juegosService.getJuegos().subscribe({
      next: (data) => (this.juegos = Object.values(data)),
      error: (error) => console.error(error),
    });
  }
}
```

Dentro de **`./src/app/app.routes.ts`**

```
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/juegos',
  },
  {
    path: 'juegos',
    loadComponent: () =>
      import('./components/juegos/juegos.component').then(
        (m) => m.JuegosComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
```

`ng add @angular/material@latest`

`ng generate module modules/material`

Dentro de **`./src/app/modules/material/material.module.ts`**

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
  ],
})
export class MaterialModule {}
```

Dentro de **`./src/app/components/juegos/juegos.component.ts`**

```
...
import { MaterialModule } from '../../modules/material/material.module';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  ...,
  imports: [MaterialModule],
  ...,
})
export class JuegosComponent implements OnInit {
  ...
  public dataSource!: MatTableDataSource<IJuego>;
  public columns = [
    {
      columnDef: 'appid',
      header: '#',
      cell: (juego: IJuego) => `${juego.appid}`,
    },
    {
      columnDef: 'image',
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
  ...
  getJuegos(): void {
    this.juegosService.getJuegos().subscribe({
      next: (data) => {
        this.juegos = Object.values(data);
        this.dataSource = new MatTableDataSource(this.juegos);
      },
      error: (error) => console.error(error),
    });
  }
}
```

Dentro de **`./src/app/components/juegos/juegos.component.html`**

```
<mat-card>
  <mat-card-header>
    <mat-card-title>Juegos</mat-card-title>
  </mat-card-header>

  <mat-card-content>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      @for (column of columns; track column) {
      <ng-container [matColumnDef]="column.columnDef">
        <th mat-header-cell *matHeaderCellDef>{{ column.header }}</th>
        @if (column.columnDef!="image") {
        <td mat-cell *matCellDef="let row">{{ column.cell(row) }}</td>
        } @else {
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
  </mat-card-content>
</mat-card>
```

Dentro de **`./src/app/components/juegos/juegos.component.ts`**

```
...
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
...
export class JuegosComponent implements OnInit {
  ...
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ...
  getJuegos(): void {
    this.juegosService.getJuegos().subscribe({
      next: (data) => {
        ...
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => console.error(error),
    });
  }

  filtrar(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

```

Dentro de **`./src/app/components/juegos/juegos.component.html`**

```
<mat-form-field>
  <mat-label>Buscar</mat-label>
  <input
    matInput
    (keyup)="filtrar($event)"
    placeholder="Ej. Counter-Strike"
    #input
  />
</mat-form-field>

<div class="mat-elevation-z8">
  <table mat-table [dataSource]="dataSource" matSort>
    @for (column of columns; track column) {
    <ng-container [matColumnDef]="column.columnDef">
      @if (column.columnDef!="image") {
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

  <mat-paginator [pageSize]="10" showFirstLastButtons></mat-paginator>
</div>
```

Dentro de **`./src/app/components/juegos/juegos.component.ts`**

```
...
import { Router } from '@angular/router';
...
export class JuegosComponent implements OnInit {
  ...
  constructor(private juegosService: JuegosService, private router: Router) {}
  ...
  detalles(appid: number) {
    this.router.navigate(['/juegos', appid]);
  }
}
```

Dentro de **`./src/app/components/juegos/juegos.component.html`**

```
...
<div class="mat-elevation-z8">
  <table mat-table [dataSource]="dataSource" matSort class="table table-hover">
    ...
    <tr
      mat-row
      (click)="detalles(row.appid)"
      *matRowDef="let row; columns: displayedColumns"
    ></tr>
  </table>
  ...
</div>
```

Dentro de **`./src/app/app.routes.ts`**

```
...
export const routes: Routes = [
  ...,
  {
    path: 'juegos',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/juegos/juegos.component').then(
            (m) => m.JuegosComponent
          ),
      },
      {
        path: ':appid',
        loadComponent: () =>
          import('./components/juego/juego.component').then(
            (m) => m.JuegoComponent
          ),
      },
    ],
  },
  ...
];
```

## [25/03/2024]

`"'https://cdn.akamai.steamstatic.com/steam/apps/'+juego.appid+'/capsule_184x69.jpg'"`
`"'https://cdn.akamai.steamstatic.com/steam/apps/'+juego.appid+'/capsule_616x353.jpg'"`
`"'https://cdn.akamai.steamstatic.com/steam/apps/'+juego.appid+'/header_292x136.jpg'"`
`"'https://cdn.akamai.steamstatic.com/steam/apps/'+juego.appid+'/header.jpg'"`
`"'https://cdn.akamai.steamstatic.com/steam/apps/'+juego.appid+'/hero_capsule.jpg'"`

Dentro de **`./src/app/modules/material/material.module.ts`**

```
...
import { MatListModule } from '@angular/material/list';

@NgModule({
  ...,
  exports: [
    ...,
    MatListModule,
  ],
})
...
```

`ng generate component components/juego --inline-style --inline-template`

Dentro de **`./src/app/components/juego/juego.component.ts`**

```
import { Component, OnInit } from '@angular/core';
import { IJuego } from '../../interfaces/juego';
import { JuegosService } from '../../services/juegos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../modules/material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css',
})
export class JuegoComponent implements OnInit {
  public appid!: number;
  public juego!: IJuego;
  public desarrolladores: string[] = [];
  public editores: string[] = [];
  public idiomas: string[] = [];
  public generos: string[] = [];
  public etiquetas: string[] = [];

  constructor(
    private juegosService: JuegosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getJuego();
  }

  getJuego(): void {
    this.activatedRoute.params.subscribe({
      next: (data) => {
        this.appid = data['appid'];

        if (!isNaN(this.appid)) {
          this.juegosService.getJuego(this.appid).subscribe({
            next: (data) => {
              this.juego = data;
              this.desarrolladores = this.juego.developer.split(',');
              this.editores = this.juego.publisher.split(',');
              this.idiomas = (this.juego.languages ?? '').split(',');
              this.generos = (this.juego.genre ?? '').split(',');
              this.etiquetas = Object.keys(this.juego.tags ?? {});
            },
            error: (error) => {
              console.error(error);
              this.router.navigate(['/juegos']);
            },
          });
        }
      },
      error: (error) => {
        console.error(error);
        this.router.navigate(['/juegos']);
      },
    });
  }
}
```

Dentro de **`./src/app/components/juego/juego.component.html`**

```
<mat-list *ngIf="juego">
  <mat-list-item>
    <span matListItemTitle>#</span>
    <span matListItemLine>{{ juego.appid }}</span>
  </mat-list-item>

  <mat-divider></mat-divider>

  <mat-list-item>
    <span matListItemTitle>Juego</span>
    <span matListItemLine>{{ juego.name }}</span>
  </mat-list-item>

  <mat-divider></mat-divider>

  <mat-list-item>
    <span matListItemTitle>Desarrollador</span>
    <span matListItemLine>
      @for (desarrollador of desarrolladores; let i = $index; let last = $last;
      track i) { {{ desarrollador }}@if (!last) {,} }
    </span>
  </mat-list-item>

  <mat-divider></mat-divider>

  <mat-list-item>
    <span matListItemTitle>Editor</span>
    <span matListItemLine>
      @for (editor of editores; let i = $index; let last = $last; track i) {
      {{ editor }}@if (!last) {,} }
    </span>
  </mat-list-item>

  <mat-divider></mat-divider>

  <mat-list-item>
    <span matListItemTitle>Precio</span>
    <span matListItemLine>{{ juego.price }}</span>
  </mat-list-item>

  <mat-divider></mat-divider>

  <mat-list-item>
    <span matListItemTitle>Idiomas</span>
    <span matListItemLine>
      @for (idioma of idiomas; let i = $index; let last = $last; track i) {
      {{ idioma }}@if (!last) {,} }
    </span>
  </mat-list-item>

  <mat-divider></mat-divider>

  <mat-list-item>
    <span matListItemTitle>Género</span>
    <span matListItemLine>
      @for (genero of generos; let i = $index; let last = $last; track i) {
      {{ genero }}@if (!last) {,} }
    </span>
  </mat-list-item>

  <mat-divider></mat-divider>

  <mat-list-item>
    <span matListItemTitle>Etiquetas</span>
    <span matListItemLine>
      @for (etiqueta of etiquetas; let i = $index; let last = $last; track i) {
      {{ etiqueta }}@if (!last) {,} }
    </span>
  </mat-list-item>
</mat-list>
```

`ng generate component components/home --inline-style --inline-template`

Dentro de **`./src/app/app.routes.ts`**

```
...
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  ...
];
```

`ng generate @angular/material:navigation components/menu --inline-style --inline-template`

Dentro de **`./src/app/components/menu/menu.component.ts`**

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

Dentro de **`./src/app/components/menu/menu.component.ts`**

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
      <a mat-list-item [routerLink]="['/']">Inicio</a>
      <a mat-list-item [routerLink]="['/juegos']">Juegos</a>
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
    <!-- Add Content Here -->
    <div class="container container-fluid pt-3">
      <router-outlet />
    </div>
  </mat-sidenav-content>
</mat-sidenav-container>
```

Dentro de **`./src/app/app.component.ts`**

```
...
import { MenuComponent } from './components/menu/menu.component';

@Component({
  ...,
  imports: [RouterOutlet, MenuComponent],
  ...,
})
...
```

Dentro de **`./src/app/app.component.html`**

```
<app-menu></app-menu>
```
