import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/chatbot';

  constructor() {}

  askChatbot(message: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ask`, { message });
  }
}
