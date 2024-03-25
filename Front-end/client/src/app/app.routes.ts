import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
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
  {
    path: '**',
    redirectTo: '/',
  },
];
