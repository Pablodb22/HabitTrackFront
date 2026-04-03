import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitoService } from '../../core/services/habito.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.css'
})
export class HabitsComponent implements OnInit {
  isModalOpen = false;
  frecuencia = 'Diario';
  categoria = 'Productividad';
  diasSeleccionados: string[] = [];
  diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  nombre: string = '';    
  descripcion: string = '';
  fecha_creacion: string = new Date().toISOString().split('T')[0];
  email: string = '';
  private route = inject(ActivatedRoute);
  habitos: any[] = []; // Nuestro array donde guardaremos todos los hábitos
  datos: any;

  private HabitoService=inject(HabitoService)


  constructor() {
    this.email = localStorage.getItem('email') || '';
  }

  ngOnInit(): void {
   this.datos = this.route.snapshot.data['data'];
   if(this.datos != null){
      // Guardamos la lista recibida en nuestro array
      this.habitos = this.datos;
   }
   console.log('Hábitos cargados:', this.habitos);
  }

  // Método auxiliar para pintar las tarjetas según la categoría
  getHabitColorName(categoria: string): string {
    switch(categoria) {
      case 'Productividad': return 'lavender';
      case 'Salud': return 'sky';
      case 'Mental': return 'peach';
      case 'Desarrollo': return 'sage';
      default: return 'lavender';
    }
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
      completo:false,     
    };
    
    this.HabitoService.crearHabito(nuevoHabito,this.email).subscribe({
      next: (response) => {
        console.log('Habito creado exitosamente:', response); 
        this.habitos.push(response);
        this.closeModal();       
      },
      error: (error) => {
        alert('Error al crear el hábito');
      }
    });   
  }

  completarHabito(habit: any) {
    this.HabitoService.completarHabito(habit.id).subscribe({
      next: (response) => {
        console.log('Habito completado exitosamente:', response);
        habit.completo = true; // Actualizamos la UI instantáneamente
      },
      error: (error) => {
        alert('Error al completar el hábito');
      }
    });   
  }

  eliminarHabito(habit: any) {
    if (confirm(`¿Estás seguro de que deseas eliminar el hábito "${habit.nombre}"?`)) {
      this.HabitoService.eliminarHabito(habit.id).subscribe({
        next: () => {
          console.log('Habito eliminado exitosamente');
          // Actualizar el array eliminando el hábito visualmente
          this.habitos = this.habitos.filter(h => h.id !== habit.id);
        },
        error: () => {
          alert('Error al eliminar el hábito');
        }
      });
    }
  }

}