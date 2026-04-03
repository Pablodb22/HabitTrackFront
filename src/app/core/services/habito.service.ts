import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/habits';

  constructor() {}

  crearHabito(habito: any, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/create/${email}`, habito);
  }


}
