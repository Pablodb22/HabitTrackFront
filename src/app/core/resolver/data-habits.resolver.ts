import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { HabitoService } from '../services/habito.service';

export const dataHabitsResolver: ResolveFn<any> = () => {
  const habitoService = inject(HabitoService);
  const email = localStorage.getItem('email') || '';

  if (!email) {
    console.warn('No email found in localStorage');
    return of(null);
  }

  return habitoService.getHabitsByUser(email).pipe(
    catchError(err => {
      console.error('Error loading habits:' , err);
      return of(null);
    })
  );
};