import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ChatbotComponent } from './shared/components/chatbot/chatbot.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, SidebarComponent, HeaderComponent, ChatbotComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'HabitTrack';
  sidebarOpen = false;
  isAuthPage = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateAuthStatus(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateAuthStatus(event.urlAfterRedirects);
    });
  }

  private updateAuthStatus(url: string) {
    const authRoutes = ['/sign-in', '/create-account'];
    this.isAuthPage = authRoutes.some(route => url.includes(route));
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }
}
