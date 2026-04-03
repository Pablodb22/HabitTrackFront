import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitoService } from '../../core/services/habito.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.css'
})
export class HabitsComponent {
  isModalOpen = false;
  frecuencia = 'Diario';
  categoria = 'Productividad';
  diasSeleccionados: string[] = [];
  diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  nombre: string = '';    
  descripcion: string = '';
  fecha_creacion: string = new Date().toISOString().split('T')[0];
  email: string = '';



  private HabitoService=inject(HabitoService)


  constructor() {
    this.email = localStorage.getItem('email') || '';
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleDia(dia: string) {
    const index = this.diasSeleccionados.indexOf(dia);
    if (index > -1) {
      this.diasSeleccionados.splice(index, 1);
    } else {
      this.diasSeleccionados.push(dia);
    }
  }

  getCategoryColor(): string {
    switch (this.categoria) {
      case 'Productividad': return 'var(--ht-lavender)';
      case 'Salud': return 'var(--ht-sky)';
      case 'Mental': return 'var(--ht-peach)';
      case 'Desarrollo': return 'var(--ht-sage)';
      default: return 'var(--ht-lavender)';
    }
  }

  crearHabito(){    
    if(this.frecuencia==="Personalizado"){
      this.frecuencia = this.diasSeleccionados.join(', ');
    }

    const nuevoHabito = {
      nombre: this.nombre,
      categoria: this.categoria,
      frecuencia: this.frecuencia,      
      fecha_creacion: this.fecha_creacion,
      descripcion: this.descripcion,      
    };
    
    this.HabitoService.crearHabito(nuevoHabito,this.email).subscribe({
      next: (response) => {
        console.log('Habito creado exitosamente:', response);        
      },
      error: (error) => {
        console.error('Error al crear el hábito:', error);
      }
    });   
  }

}