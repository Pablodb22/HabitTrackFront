import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HabitoService } from '../../core/services/habito.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit {
  
  private route = inject(ActivatedRoute);
  private habitoService = inject(HabitoService);
  private email = localStorage.getItem('email');
  
  habitos: any[] = [];

  stats = {
    currentStreak: 0, 
    bestStreak: 0,    
    completionRate: 0  
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
  
  categories: any[] = [];

  ngOnInit(): void {    
    this.habitos = this.route.snapshot.data['data'] || [];
    this.calculateAllAnalytics();
    this.loadWeeklyStats();
  }

  loadWeeklyStats(): void {
    if (!this.email) return;
    this.habitoService.getWeeklyStats(this.email).subscribe({
      next: (completions: any[]) => {
        this.processWeeklyStats(completions);
      },
      error: (err) => console.error('Error fetching weekly stats for analytics', err)
    });
  }

  processWeeklyStats(completions: any[]): void {
    const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const dailyCounts = [0, 0, 0, 0, 0, 0, 0];
    
    completions.forEach(c => {
      const date = new Date(c.fecha);
      const dayIndex = (date.getDay() + 6) % 7;
      dailyCounts[dayIndex]++;
    });

    const totalHabits = this.habitos.length || 1;
    
    this.weeklyProgress = dayNames.map((name, index) => {
      let percentage = (dailyCounts[index] / totalHabits) * 100;
      if (percentage > 100) percentage = 100;
      return {
        day: name,
        percentage: Math.round(percentage)
      };
    });
  }

  calculateAllAnalytics() {
    this.calculateCompletionRate();
    this.calculateCategoryDistribution();
    
    if (this.habitos.length > 0) {
      this.stats.currentStreak = Math.max(...this.habitos.map(h => h.currentStreak || 0), 0);
      this.stats.bestStreak = Math.max(...this.habitos.map(h => h.bestStreak || 0), 0);
    }
  }

  calculateCompletionRate() {
    if (!this.habitos || this.habitos.length === 0) return;
    const total = this.habitos.length;
    const completed = this.habitos.filter(h => h.completo).length;
    this.stats.completionRate = Math.round((completed / total) * 100);
  }

  calculateCategoryDistribution() {
    if (!this.habitos || this.habitos.length === 0) return;
    const totalHabits = this.habitos.length;
    const colorMap: { [key: string]: string } = {
       'Productividad': 'var(--ht-lavender)',
       'Salud': 'var(--ht-sage)',
       'Mental': 'var(--ht-sky)',
       'Desarrollo': 'var(--ht-peach)'
    };
    const counts: { [key: string]: number } = {};
    this.habitos.forEach(h => counts[h.categoria] = (counts[h.categoria] || 0) + 1);

    let acc = 0;
    this.categories = Object.keys(counts).map(cat => {
      const p = Math.round((counts[cat] / totalHabits) * 100);
      const data = { name: cat, percentage: p, color: colorMap[cat] || 'var(--ht-accent)', offset: acc };
      acc += p;
      return data;
    });
  }
}
