import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth';

// Guard for routes that require an authenticated user (e.g. /home,
// /bubble-tea/:id). Waits for the auth state to be resolved (Firebase
// restores the session asynchronously on page load) and then either
// allows navigation or redirects to /login.
export const privateGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  // Block the navigation until we know whether the user is signed in;
  // without this, a hard refresh on a private route could flicker to /login.
  await auth.ready;
  return auth.user() ? true : router.createUrlTree(['/login']);
};

// Guard for routes that should only be visible to anonymous users
// (e.g. /login, /register). If the user is already authenticated we
// bounce them back to /home so they don't see the auth screens.
export const publicGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.ready;
  return auth.user() ? router.createUrlTree(['/home']) : true;
};
