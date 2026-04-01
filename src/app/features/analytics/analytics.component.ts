import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
  // Mock data for easy logic implementation later
  currentStreak = 12;
  bestStreak = 24;
  weeklyCompletion = 82;
  
  weakestHabits = [
    { name: 'Meditar', percentage: 40, color: 'var(--ht-rose)' },
    { name: 'Beber Agua', percentage: 55, color: 'var(--ht-peach)' },
    { name: 'Leer', percentage: 60, color: 'var(--ht-sky)' }
  ];

}
