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
    return this.http.post(`${this.apiUrl}/login`, creedenciales);
  }

  register(datosUsuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, datosUsuario);
  }

  logout(): void {
    localStorage.removeItem('email');
  }

  getUserSettings(email:string): Observable<any> {
   return this.http.get(`${this.apiUrl}/settings/${email}`);
  }

  updateUserSettings(email: string, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/settings/${email}`, datos);
  }

  removeUser(email:string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${email}`);
  }


}
