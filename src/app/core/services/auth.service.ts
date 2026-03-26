import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/users';

  constructor() {}

  login(creedenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, creedenciales).pipe(
      tap((respuesta: any) => {
        if (respuesta.token) {
          localStorage.setItem('token', respuesta.token);
        }
      })
    );
  }

  register(datosUsuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, datosUsuario);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
