import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit {
  
  private route = inject(ActivatedRoute);
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
        
    setTimeout(() => {
      this.calculateAllAnalytics();
    }, 100);
  }

  calculateAllAnalytics() {
    this.calculateCompletionRate();
    this.calculateWeeklyProgress();
    this.calculateCategoryDistribution();
        
    if (this.stats.completionRate > 0) {
       this.stats.currentStreak = 1; 
              
       if (this.stats.currentStreak > this.stats.bestStreak) {
          this.stats.bestStreak = this.stats.currentStreak;
       }
    }
  }


  calculateCompletionRate() {
    if (!this.habitos || this.habitos.length === 0) return;
    const total = this.habitos.length;
    const completed = this.habitos.filter(h => h.completo).length;
    this.stats.completionRate = Math.round((completed / total) * 100);
  }

  calculateWeeklyProgress() {
    const today = new Date().getDay(); 
    const todayIndex = today === 0 ? 6 : today - 1;
    
    const newWeeklyProgress = [
      { day: 'Lun', percentage: 0 },
      { day: 'Mar', percentage: 0 },
      { day: 'Mié', percentage: 0 },
      { day: 'Jue', percentage: 0 },
      { day: 'Vie', percentage: 0 },
      { day: 'Sáb', percentage: 0 },
      { day: 'Dom', percentage: 0 }
    ];

    if (this.habitos.length > 0) {
      newWeeklyProgress[todayIndex].percentage = this.stats.completionRate;
    }

    this.weeklyProgress = [...newWeeklyProgress];
    console.log("BARRA ACTUALIZADA:", this.weeklyProgress);
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
