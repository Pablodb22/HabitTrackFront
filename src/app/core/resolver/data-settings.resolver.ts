// data-settings.resolver.ts
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, of } from 'rxjs';

export const dataSettingsResolver: ResolveFn<any> = () => {
  const authService = inject(AuthService);
  const email = localStorage.getItem('email') || '';

  if (!email) {
    console.warn('No email found in localStorage');
    return of(null);
  }

  return authService.getUserSettings(email).pipe(
    catchError(err => {
      console.error('Error loading settings:', err);
      return of(null);
    })
  );
};