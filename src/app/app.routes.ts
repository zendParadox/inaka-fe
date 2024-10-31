import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { HomeComponent } from '../page/home/home.component';
import { DashboardComponent } from '../page/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { AuthGuard } from '../auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];
