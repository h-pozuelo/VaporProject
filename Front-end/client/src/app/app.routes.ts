import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'biblioteca',
    loadComponent: () =>
      import('./pages/biblioteca/biblioteca.component').then((m) => m.BibliotecaComponent),
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
    canActivate: [AuthGuard],
  },
  {
    path: 'registrar-usuario',
    loadComponent: () =>
      import('./pages/registrar-usuario/registrar-usuario.component').then(
        (m) => m.RegistrarUsuarioComponent
      ),
  },
  {
    // ruta para el login
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'perfil',
    children: [
      {
        path: 'carrito',
        loadComponent: () =>
          import('./pages/carrito/carrito.component').then(
            (m) => m.CarritoComponent
          ),
      },
      {
        path: 'biblioteca',
        loadComponent: () =>
          import('./pages/biblioteca/biblioteca.component').then(
            (m) => m.BibliotecaComponent
          ),
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
