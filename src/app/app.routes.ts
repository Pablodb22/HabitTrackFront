import { Routes } from '@angular/router';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { SettingsComponent } from './features/settings/settings.component';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';
import { HabitsComponent } from './features/habits/habits.component';
import { CreateAccountComponent } from './features/auth/create-account/create-account.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { dataSettingsResolver } from './core/resolver/data-settings.resolver';
import { dataHabitsResolver } from './core/resolver/data-habits.resolver';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'analytics', component: AnalyticsComponent, resolve: { data: dataHabitsResolver } },
  { path: 'settings', component: SettingsComponent,resolve:{data:dataSettingsResolver} },
  { path: 'sign-in', component: SignInComponent },
  { path: 'my-habits', component: HabitsComponent,resolve:{data:dataHabitsResolver} },
  { path: 'create-account', component: CreateAccountComponent },
];
