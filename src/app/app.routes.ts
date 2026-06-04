import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './services/auth-guards';

// The routing tree is split into two sibling groups with an empty `path`
// so each group can apply its own guard to every child route inside it,
// avoiding the need to repeat `canActivate` on each leaf.
export const routes: Routes = [
  // Default landing — send unauthenticated users to /login.
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Public area: only reachable when the user is NOT logged in.
  // `publicGuard` redirects authenticated users to /home so they don't
  // see the login/register screens again.
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

  // Private area: only reachable when the user IS logged in.
  // `privateGuard` redirects unauthenticated users to /login.
  // All children are lazy-loaded standalone components.
  {
    path: '',
    canActivate: [privateGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/private/home/home').then((m) => m.Home),
      },
      {
        // Detail page — the `:id` segment is bound to the component's
        // `input.required<string>('id')` via `withComponentInputBinding()`
        // (configured in app.config.ts).
        path: 'bubble-tea/:id',
        loadComponent: () =>
          import('./pages/private/bubble-tea-detail/bubble-tea-detail').then(
            (m) => m.BubbleTeaDetail,
          ),
      },
      {
        path: 'form-bubbleteas',
        loadComponent: () =>
          import('./pages/private/form-bubbleteas/form-bubbleteas').then(
            (m) => m.FormBubbleteas,
          ),
      },
      {
        path: 'form-bubbleteas/:id',
        loadComponent: () =>
          import('./pages/private/form-bubbleteas/form-bubbleteas').then(
            (m) => m.FormBubbleteas,
          ),
      },
    ],
  },

  // Catch-all for unknown URLs. Public, so it works for both logged-in and
  // anonymous users without triggering a guard redirect.
  {
    path: '**',
    loadComponent: () =>
      import('./pages/public/not-found/not-found').then((m) => m.NotFound),
  },
];
