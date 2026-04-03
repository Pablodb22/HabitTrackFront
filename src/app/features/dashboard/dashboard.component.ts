import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
   email=localStorage.getItem('email');
   private router = inject(Router);
   
   
   constructor(){ 
    if(this.email==null){
      this.router.navigate(['/sign-in'])
    }   
   }

 


}