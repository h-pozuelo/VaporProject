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
    path: 'registrar-usuario',
    loadComponent: () =>
      import('./pages/registrar-usuario/registrar-usuario.component').then(
        (m) => m.RegistrarUsuarioComponent
      ),
  },
  { // ruta para el login
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
