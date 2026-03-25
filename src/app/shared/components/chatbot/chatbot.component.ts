import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  handleStarterClick(starter: string) {
    this.userMessage = starter;
    this.sendMessage();
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;
    
    this.messages.push({ from: 'user', text: this.userMessage });
    const currentMsg = this.userMessage;
    this.userMessage = '';
    
    this.scrolltobottom();

    this.msgInputDisabled = true;
    setTimeout(() => {
      this.getBotResponse(currentMsg);
      this.msgInputDisabled = false;
      this.scrolltobottom();
    }, 1000);
  }

  private getBotResponse(input: string) {
    const text = input.toLowerCase();
    let response = "No estoy seguro de haberte entendido. ¿Puedes explicarlo de otra forma?";

    if (text.includes('hola') || text.includes('buenos')) {
      response = "¡Hola! Qué alegría volver a verte. ¿Cómo va tu racha hoy?";
    } else if (text.includes('hábito') || text.includes('habito') || text.includes('crear')) {
      response = "Los hábitos son la clave del éxito. Puedes crearlos desde la sección 'Mis Hábitos'.";
    } else if (text.includes('configuración') || text.includes('ajustes') || text.includes('perfil')) {
      response = "Puedes cambiar tu avatar y datos personales en la pestaña de Ajustes.";
    } else if (text.includes('estadísticas') || text.includes('progreso')) {
      response = "¡Veo que te interesa tu progreso! En 'Analytics' tienes gráficos detallados.";
    } else if (text.includes('gracias')) {
      response = "¡De nada! Aquí estaré si me necesitas.";
    }

    this.messages.push({ from: 'bot', text: response });
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