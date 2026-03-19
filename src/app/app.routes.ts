import { Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { SettingsComponent } from './settings/settings.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MyHabitsComponent } from './my-habits/my-habits.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'my-habits', component: MyHabitsComponent },
  { path: 'create-account', component: CreateAccountComponent },
];
