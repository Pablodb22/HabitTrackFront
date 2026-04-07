import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  private authService = inject(AuthService);
  private router = inject(Router);

  userName: string = 'Usuario';
  userEmail: string = '';
  userPhoto: string = '';

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.userEmail = email;
      this.authService.getUserSettings(email).subscribe({
        next: (data: any) => {
          if (data) {
            this.userName = data.nombre || 'Usuario';
            this.userPhoto = data.fotoPerfil || '';
          }
        },
        error: (err: any) => console.error('Error fetching user data for sidebar:', err)
      });
    }
  }

  onClose() {
    this.close.emit();
  }

  navigateToSettings(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.onClose();
    this.router.navigate(['/settings']);
  }

  logout() {
    this.onClose();
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }
}