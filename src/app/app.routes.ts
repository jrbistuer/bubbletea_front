import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './services/auth-guards';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    canActivate: [publicGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/public/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/public/register/register').then((m) => m.Register),
      },
    ],
  },
  {
    path: '',
    canActivate: [privateGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/private/home/home').then((m) => m.Home),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/public/not-found/not-found').then((m) => m.NotFound),
  },
];
