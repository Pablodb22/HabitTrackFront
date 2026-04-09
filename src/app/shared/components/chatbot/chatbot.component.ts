import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../../core/services/chatbot.service';

interface Message {
  from: 'bot' | 'user';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  isOpen = false;
  userMessage = '';
  msgInputDisabled = false;
  
  starters: string[] = [
    '¿Cómo puedo crear un nuevo hábito?',
    '¿Donde veo mis estadísticas?',
    '¿Cómo puedo cambiar mi perfil?'
  ];

  messages: Message[] = [
    { from: 'bot', text: '¡Hola! Soy tu asistente de HabitTrack. ¿En qué puedo ayudarte hoy?' }
  ];

  private chatbotService = inject(ChatbotService);

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  handleStarterClick(starter: string) {
    this.userMessage = starter;
    this.sendMessage();
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;
    
    const userText = this.userMessage;
    this.messages.push({ from: 'user', text: userText });
    this.userMessage = '';
    
    this.scrolltobottom();
    this.msgInputDisabled = true;

    this.chatbotService.askChatbot(userText).subscribe({
      next: (res: any) => {
        this.messages.push({ from: 'bot', text: this.formatMessage(res.response) });
        this.msgInputDisabled = false;
        this.scrolltobottom();
      },
      error: (err: any) => {
        console.error(err);
        this.messages.push({ from: 'bot', text: 'Lo siento, hubo un error al procesar tu mensaje.' });
        this.msgInputDisabled = false;
        this.scrolltobottom();
      }
    });
  }

  formatMessage(text: string): string {
    if (!text) return '';
    // Negritas: **texto** -> <strong>texto</strong>
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Saltos de línea: \n -> <br>
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
  }

  private scrolltobottom() {
    setTimeout(() => {
      const anchor = document.getElementById('anchor');
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
} 