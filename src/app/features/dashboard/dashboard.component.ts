import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { HabitoService } from '../../core/services/habito.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  email = localStorage.getItem('email');
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private habitoService = inject(HabitoService);

  habits: any[] = [];
  stats = {
    activos: 0,
    completados: 0,
    currentStreak: 0,
    bestStreak: 0,
    consistencia: 0
  };

  weeklyProgress = [
    { day: 'Lun', percentage: 0 },
    { day: 'Mar', percentage: 0 },
    { day: 'Mié', percentage: 0 },
    { day: 'Jue', percentage: 0 },
    { day: 'Vie', percentage: 0 },
    { day: 'Sáb', percentage: 0 },
    { day: 'Dom', percentage: 0 }
  ];

  constructor() {
    if (this.email == null) {
      this.router.navigate(['/sign-in']);
    }
  }

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['data'];
    if (resolvedData) {
      this.habits = resolvedData;
      this.calculateStats();
    } else if (this.email) {
      this.loadHabits();
    }
    this.loadWeeklyStats();
  }

  loadHabits(): void {
    this.habitoService.getHabitsByUser(this.email!).subscribe({
      next: (data) => {
        this.habits = data;
        this.calculateStats();
      },
      error: (err) => {
        console.error('Error fetching habits', err);
      }
    });
  }

  loadWeeklyStats(): void {
    if (!this.email) return;
    this.habitoService.getWeeklyStats(this.email).subscribe({
      next: (completions: any[]) => {
        this.processWeeklyStats(completions);
      },
      error: (err) => console.error('Error fetching weekly stats', err)
    });
  }

  processWeeklyStats(completions: any[]): void {
    // Initialize day map
    const dayMap: { [key: string]: number } = {
      'MONDAY': 0, 'TUESDAY': 1, 'WEDNESDAY': 2, 'THURSDAY': 3,
      'FRIDAY': 4, 'SATURDAY': 5, 'SUNDAY': 6
    };
    
    // Day names for display
    const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    
    // Temporary counts
    const dailyCounts = [0, 0, 0, 0, 0, 0, 0];
    
    // Get completion dates for this week
    const now = new Date();
    // In JS, getDay() returns 0 for Sunday. We want 0 for Monday.
    const todayNum = (now.getDay() + 6) % 7; 
    
    completions.forEach(c => {
      const date = new Date(c.fecha);
      const dayIndex = (date.getDay() + 6) % 7;
      dailyCounts[dayIndex]++;
    });

    const totalHabits = this.habits.length || 1; // Avoid division by zero
    
    this.weeklyProgress = dayNames.map((name, index) => {
      // Calculate percentage based on total habits. 
      // If we have 5 habits and 5 completions on Monday, it's 100%.
      let percentage = (dailyCounts[index] / (totalHabits || 1)) * 100;
      if (percentage > 100) percentage = 100;

      return {
        day: name,
        percentage: Math.round(percentage)
      };
    });
  }

  calculateStats(): void {
    if (!this.habits || this.habits.length === 0) {
      this.stats = { activos: 0, completados: 0, currentStreak: 0, bestStreak: 0, consistencia: 0 };
      return;
    }
    
    const total = this.habits.length;
    this.stats.activos = this.habits.filter(h => !h.completo).length;
    this.stats.completados = this.habits.filter(h => h.completo).length;
    this.stats.consistencia = Math.round((this.stats.completados / total) * 100);
    
    // Use the max streak found among all habits
    this.stats.currentStreak = Math.max(...this.habits.map(h => h.currentStreak || 0), 0);
    this.stats.bestStreak = Math.max(...this.habits.map(h => h.bestStreak || 0), 0);
  }

  toggleHabit(habit: any): void {
    if (!habit.completo) {
      this.habitoService.completarHabito(habit.id).subscribe({
        next: (result: any) => {
          // Update habit with backend response (includes new streaks)
          habit.completo = true;
          habit.currentStreak = result.currentStreak;
          habit.bestStreak = result.bestStreak;
          
          this.calculateStats();
          this.loadWeeklyStats(); // Refresh chart
        },
        error: (err) => console.error('Error completing habit', err)
      });
    }
  }

  getBadgeClass(category: string): string {
    if (!category) return 'badge-rose';
    const cat = category.toLowerCase();
    if (cat.includes('salud')) return 'badge-sky';
    if (cat.includes('productividad')) return 'badge-lavender';
    if (cat.includes('desarrollo')) return 'badge-sage';
    if (cat.includes('mental')) return 'badge-peach';
    return 'badge-rose';
  }
}