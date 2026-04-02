import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ChatbotComponent } from './shared/components/chatbot/chatbot.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, HeaderComponent, ChatbotComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'HabitTrack';
  sidebarOpen = false;
  isAuthPage = false;
  showChatbot = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateRouteStatus(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateRouteStatus(event.urlAfterRedirects);
    });
  }

  private updateRouteStatus(url: string) {
    const authRoutes = ['/sign-in', '/create-account'];
    this.isAuthPage = authRoutes.some(route => url.includes(route));
    this.showChatbot = !url.includes('/settings');
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }
}