import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/juegos',
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
